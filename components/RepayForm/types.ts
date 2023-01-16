import { PublicKey } from '@solana/web3.js';

export type RepayProps = {
  collectionId?: string;
  openPositions?: any;
  nftPrice?: number;
  userAllowance: number;
  userDebt: number;
  loanToValue: number;
  availableNFTs: any;
  fetchedReservePrice: number;
  currentMarketId: string;
  executeWithdrawNFT: (mint: string, toast: any) => void;
  executeRepay: (val: number, metadata: PublicKey, toast: any) => void;
  hideMobileSidebar?: () => void;
  changeTab?: (tabKey: string) => void;
};
