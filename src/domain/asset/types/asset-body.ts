/**
 * Asset body
 * @interface
 */
export type AssetBody = {
  lastCall: {
    servingNetwork: {
      mcc: string;
      mnc: string;
    };
    startTime: string;
    endTime: string;
    ipAddress: string;
    imei: string;
    bytes: number;
    roundedBytes: number;
  };
  status: string;
  ownership: string[];
  id: string;
  ownerAccountId: string;
  ownerAccountName: string;
  iccid: string;
  imei: string;
  fixedIPs: [
    {
      carrier: string;
      ip: string;
    },
  ];
  carriers: CarriersBody;
  limit: number;
  subscriptions: SubscriptionsBody;
  setups: SetupBody[];
  msisdn: [string];
  virtualMSISDN: [
    {
      provider: string;
      msisdn: string;
    },
  ];
  model: string;
  type: string;
  profileState: string;
  profileType: string;
  bootstrapEid: string;
  activationDate: string;
  deactivationDate: string;
  reactivationDate: string;
  subscriptionDate: string;
  suspensionDate: string;
  smsLimit: number;
  lastSMS: {
    type: string;
    endTime: string;
    originatingAddress: string;
    destinationAddress: string;
    servingNetwork: {
      mcc: string;
      mnc: string;
    };
  };
  securityServices: [
    {
      poolId: string;
      name: string;
      type: string;
      carrier: string;
      ranges: [
        {
          address: string;
          netmask: number;
          hostMin: number;
          hostMax: number;
          usableHosts: number;
        },
      ];
    },
  ];
};

/**
 * Carriers body
 */
export type CarriersBody = {
  UKJ?: boolean;
  UKAT?: boolean;
  UKRO?: boolean;
  UKTM?: boolean;
  UKA?: boolean;
  UKK?: boolean;
  UKMX?: boolean;
  UKJBB?: boolean;
  UKP?: boolean;
  UKX?: boolean;
  ROAF?: boolean;
  ROCT?: boolean;
  NAQM?: boolean;
  NAVZ?: boolean;
  PEPVZ?: boolean;
  ROPD?: boolean;
  ROPDT?: boolean;
  ROPDB?: boolean;
  ROTEU?: boolean;
  ROTAM?: boolean;
  ROTAS?: boolean;
  ROTAU?: boolean;
  ROTGL?: boolean;
  ROTBR?: boolean;
  ROTBS?: boolean;
  NAUS?: boolean;
  NAMP?: boolean;
  ROMK?: boolean;
  ROMT?: boolean;
  ROTL?: boolean;
  RAMEN?: boolean;
  ROTN?: boolean;
  NAMR?: boolean;
  NATM?: boolean;
  NAMB?: boolean;
  NAC3?: boolean;
  ROAS?: boolean;
  ROWT?: boolean;
  NAEX?: boolean;
  ROPT?: boolean;
  ROPU?: boolean;
  ROPI?: boolean;
  ROPS?: boolean;
  ROPH?: boolean;
  ROPE?: boolean;
  P1SCVF?: boolean;
  PAN3EC?: boolean;
  TEST?: boolean;
};

/**
 * Subscriptions body
 */
export type SubscriptionsBody = {
  bundles: {
    dfProducts: {
      DataPoolProduct: string;
      PerMbProduct: string;
    };
    bundleId: string;
    localProductId: string;
    localProductName: string;
    sharedDataPoolId: string;
    initialSize: number;
    remainingBytes: number;
    preactivationInitialBytes: number;
    preactivationRemainingBytes: number;
    preactivationInitialSms: number;
    preactivationRemainingSms: number;
    preactivationInitialVoice: number;
    preactivationRemainingVoice: number;
    dataUsed: number;
    startTime: string;
    endTime: string;
    cost: number;
    creditUsed: number;
    perMbCost: number;
    type: string;
    smsInitialSize: number;
    remainingSms: number;
    proratedSms: number;
    smsUsed: number;
    smsCreditUsed: number;
    smsCost: number;
  }[];
  id: string;
  accountId: string;
  limit: number;
  smsLimit: number;
};

/**
 * Setup body
 */
export type SetupBody = {
  accountId: string;
  assetName: string;
  alerts: {
    notification: string;
    type: string;
    limit: number;
    enabled: true;
  }[];
  smsAlerts: {
    notification: string;
    type: string;
    limit: number;
    enabled: true;
  }[];

  statusAlerts: {
    notification: string;
    type: string;
    limit: number;
    enabled: true;
  }[];
  dormantFeeAlerts: {
    notification: string;
    type: string;
    limit: number;
    enabled: true;
  }[];

  tags: {
    key: string;
    value: string;
  }[];
};
