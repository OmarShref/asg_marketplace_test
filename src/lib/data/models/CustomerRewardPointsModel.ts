export type CustomerRewardPointsHistoryItemType = {
  id: number;
  actionDate: string;
  amount: number;
  comment: string;
  action: string;
  pointsLeft: number;
  visibleForCustomer: boolean;
  expirationDate: string;
  expiringAmount: number;
};

export class CustomerRewardPointsModel {
  #customerRewardPointsData: any;

  currentBalance: number = 0;
  history: CustomerRewardPointsHistoryItemType[] = [];

  //   ===============================================================================================

  constructor({ customerRewardPointsData }: { customerRewardPointsData: any }) {
    this.#customerRewardPointsData = customerRewardPointsData;
  }

  //   ===============================================================================================

  fromGql() {
    this.currentBalance = this.#customerRewardPointsData?.current_balance;
    this.history = this.#customerRewardPointsData?.history?.map(
      (historyItem: any): CustomerRewardPointsHistoryItemType => {
        return {
          id: historyItem?.id,
          actionDate: historyItem?.action_date,
          amount: historyItem?.amount,
          comment: historyItem?.comment,
          action: historyItem?.action,
          pointsLeft: historyItem?.points_left,
          visibleForCustomer: historyItem?.visible_for_customer,
          expirationDate: historyItem?.expiration_date,
          expiringAmount: historyItem?.expiring_amount,
        };
      },
    );

    return this;
  }
}
