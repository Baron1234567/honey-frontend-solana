import React, { FC, useState } from 'react';
import Image from 'next/image';
import { InfoBlock } from '../InfoBlock/InfoBlock';
import { InputsBlock } from '../InputsBlock/InputsBlock';
import { Range } from '../Range/Range';
import * as styles from './BorrowForm.css';
import { formatNumber } from '../../helpers/format';
import honeyEyes from '/public/nfts/honeyEyes.png';
import HoneyButton from 'components/HoneyButton/HoneyButton';
import HexaBoxContainer from 'components/HexaBoxContainer/HexaBoxContainer';
import NftList from '../NftList/NftList';
import { NftCardProps } from '../NftCard/types';
import { MAX_LTV } from '../../constants/loan';
import { usdcAmount } from '../HoneyButton/HoneyButton.css';
import {BorrowProps} from './types'

const { format: f, formatPercent: fp, formatUsd: fu } = formatNumber;

const BorrowForm: FC<BorrowProps> = (props: BorrowProps) => {
  const {availableNFTs} = props;
  
  const [valueUSD, setValueUSD] = useState<number>();
  const [valueUSDC, setValueUSDC] = useState<number>();
  const [rangeValue, setRangeValue] = useState(0);
  const [isNftSelected, setIsNftSelected] = useState(false)
  const [selectedNft, setSelectedNft] = useState({name: '', id: '', img: ''});

  // Only for test purposes
  // const isNftSelected = true;

  // Put your validators here
  const isBorrowButtonDisabled = () => {
    return true;
  };

  // const nftsMockData: NftCardProps[] = [
  //   {
  //     id: '1',
  //     img: 'path/to/iamge',
  //     name: 'Doodles #1291',
  //     text: '$1,000',
  //     hint: 'Value',
  //     buttonText: '$600'
  //   },
  //   {
  //     id: '2',
  //     img: 'path/to/iamge',
  //     name: 'Doodles #1291',
  //     text: '$1,000',
  //     hint: 'Value',
  //     buttonText: '$600'
  //   },
  //   {
  //     id: '3',
  //     img: 'path/to/iamge',
  //     name: 'Doodles #1291',
  //     text: '$1,000',
  //     hint: 'Value',
  //     buttonText: '$600'
  //   },
  //   {
  //     id: '4',
  //     img: 'path/to/iamge',
  //     name: 'Doodles #1291',
  //     text: '$1,000',
  //     hint: 'Value',
  //     buttonText: '$600'
  //   }
  // ];

  const selectNFT = (name: string, id: string, img: string) => {
    setIsNftSelected(true);
    console.log(`${name} - ${id} - ${img} selected`);
    setSelectedNft({ name, id, img })
  };

  const renderContent = () => {
    if (!isNftSelected) {
      return (
        <>
          <div className={styles.newBorrowingTitle}>Choose NFT</div>
          <NftList 
            data={availableNFTs} 
            selectNFT={selectNFT}
          />
        </>
      );
    }

    return (
      <>
        <div className={styles.nftInfo}>
          <div className={styles.nftImage}>
            <HexaBoxContainer>
              <Image 
                src={selectedNft.img} 
                alt={`${selectedNft.name}`} 
                layout='fill'
              />
            </HexaBoxContainer>
          </div>
          <div className={styles.nftName}>{selectedNft.name}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <InfoBlock
              value={fu(1000)}
              valueSize="big"
              footer={<span>Estimated value</span>}
            />
          </div>
          <div className={styles.col}>
            <InfoBlock
              value={fp(75)}
              valueSize="big"
              footer={<span>Liquidation at</span>}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.col}>
            <InfoBlock title={'Risk level'} value={fu(0)} />
          </div>
          <div className={styles.col}>
            <InfoBlock
              title={'New risk level'}
              value={fu(0)}
              isDisabled={true}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.col}>
            <InfoBlock title={'Debt'} value={fu(0)} />
          </div>
          <div className={styles.col}>
            <InfoBlock title={'New debt'} value={fu(0)} isDisabled={true} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.col}>
            <InfoBlock
              title={'Allowance'}
              value={fu(600)}
              footer={<>No more than {fp(60)}</>}
            />
          </div>
          <div className={styles.col}>
            <InfoBlock title={'New allowance'} value={fu(0)} />
          </div>
        </div>

        <div className={styles.inputs}>
          <InputsBlock
            valueUSD={valueUSD}
            valueUSDC={valueUSDC}
            onChangeUSD={setValueUSD}
            onChangeUSDC={setValueUSDC}
          />
        </div>

        <Range
          currentValue={rangeValue}
          maxValue={1000}
          borrowedValue={0}
          maxSafePosition={0.4}
          maxAvailablePosition={MAX_LTV}
          onChange={setRangeValue}
        />
      </>
    );
  };

  const renderFooter = () => {
    if (!isNftSelected) {
      return (
        <div className={styles.buttons}>
          <div className={styles.bigCol}>
            <HoneyButton
              variant="secondary"
              disabled={isBorrowButtonDisabled()}
              isFluid
            >
              Cancel
            </HoneyButton>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.buttons}>
        <div className={styles.smallCol}>
          <HoneyButton variant="secondary" onClick={() => setIsNftSelected(false)}>Cancel</HoneyButton>
        </div>
        <div className={styles.bigCol}>
          <HoneyButton
            usdcAmount={valueUSDC || 0}
            usdcValue={valueUSD || 0}
            variant="primary"
            disabled={isBorrowButtonDisabled()}
            isFluid
          >
            Borrow
          </HoneyButton>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.borrowForm}>
      <div className={styles.content}>{renderContent()}</div>

      <div className={styles.footer}>{renderFooter()}</div>
    </div>
  );
};

export default BorrowForm;
