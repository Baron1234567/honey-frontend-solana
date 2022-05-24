import React, { useEffect, useState } from 'react';
import { Box, Card, Stack } from 'degen';
import LoanBorrow from '../../components/LoanBorrow';
import LoanRepay from '../../components/LoanRepay';
import * as styles from './BorrowNFTsModule.css';
import ToggleSwitchLoan from '../../components/ToggleSwitchLoan';

interface BorrowNFTsModule {
  NFT?: any,
  executeWithdrawNFT: (key: any) => void;
  mint: any;
  executeBorrow:(val: any) => void;
  executeRepay: (val: any) => void;
  honeyUser: any;
  openPositions?: any;
  loanPositions: any;
  parsedReserves: any;
}

const BorrowNFTsModule = (props: BorrowNFTsModule) => {
  const { NFT, executeWithdrawNFT, mint, loanPositions, executeBorrow, executeRepay, openPositions, parsedReserves } = props;

  /**
   * @description sets default state for borrow or repay module 0 = borrow 1 = repay
   * @params 0 || 1
   * @returns borrow or repay module to be rendered 
  */
  const [borrowOrRepay, setBorrowOrRepay] = useState(0);
  
  /**
   * @description updates loanPositions
   * @params none
   * @returns loanPositions
  */
  useEffect(() => {
  }, [loanPositions]);

  return (
    <Box className={styles.cardContainer}>
      <Card level="2" width="full" padding="8" shadow>
        <Stack space="5">
          <ToggleSwitchLoan
            buttons={[
              {
                title: 'Borrow',
                onClick: () => setBorrowOrRepay(0)
              },
              { title: 'Repay', onClick: () => setBorrowOrRepay(1) }
            ]}
            activeIndex={borrowOrRepay}
          />
          {borrowOrRepay == 0 ? (
            <LoanBorrow 
              NFT={NFT} 
              executeBorrow={executeBorrow} 
              openPositions={openPositions} 
              loanPositions={loanPositions} 
              parsedReserves={parsedReserves}
            />
          ) : (
            <LoanRepay 
              NFT={NFT} 
              executeWithdrawNFT={executeWithdrawNFT} 
              mint={mint} 
              executeRepay={executeRepay} 
              loanPositions={loanPositions} 
              parsedReserves={parsedReserves}
            />
          )}
        </Stack>
      </Card>
    </Box>
  );
};

export default BorrowNFTsModule;
