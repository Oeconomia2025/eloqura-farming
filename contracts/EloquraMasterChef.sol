// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EloquraMasterChef is Ownable {
    using SafeERC20 for IERC20;

    struct PoolInfo {
        IERC20 stakingToken;
        uint256 allocPoint;
        uint256 lastRewardBlock;
        uint256 accELOQPerShare;
    }

    struct UserInfo {
        uint256 amount;
        uint256 rewardDebt;
    }

    IERC20 public immutable eloqToken;
    uint256 public eloqPerBlock;
    uint256 public totalAllocPoint = 0;
    uint256 public startBlock;

    PoolInfo[] public poolInfo;
    mapping(uint256 => mapping(address => UserInfo)) public userInfo;

    constructor(IERC20 _eloqToken, uint256 _eloqPerBlock, uint256 _startBlock) {
        eloqToken = _eloqToken;
        eloqPerBlock = _eloqPerBlock;
        startBlock = _startBlock;
    }

    function addPool(uint256 _allocPoint, IERC20 _stakingToken, bool _withUpdate) external onlyOwner {
        if (_withUpdate) massUpdatePools();
        totalAllocPoint += _allocPoint;
        poolInfo.push(PoolInfo({
            stakingToken: _stakingToken,
            allocPoint: _allocPoint,
            lastRewardBlock: block.number > startBlock ? block.number : startBlock,
            accELOQPerShare: 0
        }));
    }

    function setPool(uint256 _pid, uint256 _allocPoint, bool _withUpdate) external onlyOwner {
        if (_withUpdate) massUpdatePools();
        totalAllocPoint = totalAllocPoint - poolInfo[_pid].allocPoint + _allocPoint;
        poolInfo[_pid].allocPoint = _allocPoint;
    }

    function setELOQPerBlock(uint256 _eloqPerBlock) external onlyOwner {
        eloqPerBlock = _eloqPerBlock;
    }

    function poolLength() external view returns (uint256) {
        return poolInfo.length;
    }

    function pendingELOQ(uint256 _pid, address _user) external view returns (uint256) {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][_user];
        uint256 accELOQPerShare = pool.accELOQPerShare;
        uint256 lpSupply = pool.stakingToken.balanceOf(address(this));
        if (block.number > pool.lastRewardBlock && lpSupply != 0) {
            uint256 multiplier = block.number - pool.lastRewardBlock;
            uint256 eloqReward = multiplier * eloqPerBlock * pool.allocPoint / totalAllocPoint;
            accELOQPerShare += (eloqReward * 1e12) / lpSupply;
        }
        return (user.amount * accELOQPerShare / 1e12) - user.rewardDebt;
    }

    function deposit(uint256 _pid, uint256 _amount) external {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        updatePool(_pid);
        if (user.amount > 0) {
            uint256 pending = (user.amount * pool.accELOQPerShare / 1e12) - user.rewardDebt;
            if (pending > 0) {
                eloqToken.safeTransfer(msg.sender, pending);
            }
        }
        if (_amount > 0) {
            pool.stakingToken.safeTransferFrom(msg.sender, address(this), _amount);
            user.amount += _amount;
        }
        user.rewardDebt = user.amount * pool.accELOQPerShare / 1e12;
    }

    function withdraw(uint256 _pid, uint256 _amount) external {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        require(user.amount >= _amount, "withdraw: not enough");
        updatePool(_pid);
        uint256 pending = (user.amount * pool.accELOQPerShare / 1e12) - user.rewardDebt;
        if (pending > 0) {
            eloqToken.safeTransfer(msg.sender, pending);
        }
        if (_amount > 0) {
            user.amount -= _amount;
            pool.stakingToken.safeTransfer(msg.sender, _amount);
        }
        user.rewardDebt = user.amount * pool.accELOQPerShare / 1e12;
    }

    function emergencyWithdraw(uint256 _pid) external {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        pool.stakingToken.safeTransfer(msg.sender, user.amount);
        user.amount = 0;
        user.rewardDebt = 0;
    }

    function updatePool(uint256 _pid) public {
        PoolInfo storage pool = poolInfo[_pid];
        if (block.number <= pool.lastRewardBlock) return;
        uint256 lpSupply = pool.stakingToken.balanceOf(address(this));
        if (lpSupply == 0) {
            pool.lastRewardBlock = block.number;
            return;
        }
        uint256 multiplier = block.number - pool.lastRewardBlock;
        uint256 eloqReward = multiplier * eloqPerBlock * pool.allocPoint / totalAllocPoint;
        pool.accELOQPerShare += (eloqReward * 1e12) / lpSupply;
        pool.lastRewardBlock = block.number;
    }

    function massUpdatePools() public {
        uint256 len = poolInfo.length;
        for (uint256 pid = 0; pid < len; ++pid) {
            updatePool(pid);
        }
    }
}
