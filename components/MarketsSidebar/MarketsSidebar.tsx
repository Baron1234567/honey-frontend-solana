import React, { useEffect, useState } from 'react';
import * as styles from './MarketsSidebar.css';
import { MarketsSidebarProps } from './types';
import BorrowForm from '../BorrowForm/BorrowForm';
import { Typography } from 'antd';
import RepayForm from '../RepayForm/RepayForm';
import HoneyTabs, { HoneyTabItem } from 'components/HoneyTabs/HoneyTabs';
import EmptyStateDetails from 'components/EmptyStateDetails/EmptyStateDetails';

const items: [HoneyTabItem, HoneyTabItem] = [
  { label: 'Borrow', key: 'borrow' },
  { label: 'Repay', key: 'repay' }
];

const { Text } = Typography;

type Tab = 'borrow' | 'repay';

const MarketsSidebar = (props: MarketsSidebarProps) => {
  const wallet = true;
  const { collectionId, availableNFTs, openPositions, nftPrice, executeDepositNFT, executeWithdrawNFT, executeBorrow, executeRepay } = props;
  const [activeTab, setActiveTab] = useState<Tab>('borrow');

  const handleTabChange = (tabKey: string) => {
    setActiveTab(tabKey as Tab);
  };

  useEffect(() => {}, [openPositions]);

  return (
    <div className={styles.marketsSidebarContainer}>
      <HoneyTabs
        activeKey={activeTab}
        onTabChange={handleTabChange}
        items={items}
        active={Boolean(collectionId)}
      >
        {!wallet ? (
          <EmptyStateDetails
            icon={<div className={styles.lightIcon} />}
            title="You didn’t connect any wallet yet"
            description="First, choose a NFT collection"
            btnTitle="CONNECT WALLET"
          />
        ) : !collectionId ? (
          <EmptyStateDetails
            icon={<div className={styles.boltIcon} />}
            title="Manage panel"
            description="First, choose a NFT collection"
          />
        ) : (
          <>
            {activeTab === 'borrow' && <BorrowForm executeBorrow={executeBorrow} availableNFTs={availableNFTs} openPositions={openPositions} nftPrice={nftPrice} executeDepositNFT={executeDepositNFT} />}
            {activeTab === 'repay' && <RepayForm executeRepay={executeRepay} openPositions={openPositions} nftPrice={nftPrice} executeWithdrawNFT={executeWithdrawNFT} />}
          </>
        )}
      </HoneyTabs>
    </div>
  );
};

export default MarketsSidebar;
