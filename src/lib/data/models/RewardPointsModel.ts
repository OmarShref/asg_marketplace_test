export class RewardPointsModel {
  #rewardPointsData: any;

  visible: boolean = false;
  points: number = 0;
  color: string = "";

  constructor({ rewardPointsData }: { rewardPointsData: any }) {
    this.#rewardPointsData = rewardPointsData;
  }

  fromProduct() {
    this.visible = this.#rewardPointsData?.visible;
    this.points = this.#rewardPointsData?.points;
    this.color = this.#rewardPointsData?.color;

    return this;
  }

  fromCheckout() {
    this.visible = this.#rewardPointsData?.visible;
    this.points = this.#rewardPointsData?.points;
    this.color = this.#rewardPointsData?.color;

    return this;
  }
}
