export interface IStakesResponse {
  count: number;
  stakedAmount: number;
}

export interface IBurnsResponse {
  "30d": {
    amount: number;
    count: number;
  };
  total: {
    amount: number;
    count: number;
  };
}

export interface IEarningsResponse{
	allTime: {
		num: number,
		amount: number
	},
	"24h": {
		num: number,
		amount: number
	}
}

