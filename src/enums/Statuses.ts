export enum OrderStatuses {
  CREATED = 'CREATED',
  IN_PROGRESS = 'IN_PROGRESS',

  AVAILABLE_FOR_PICKUP = 'AVAILABLE_FOR_PICKUP',
  
  COMPLETED = 'COMPLETED',
  CONFIRMED = 'CONFIRMED',
  
  CANCELLED_BY_BUYER = 'CANCELLED_BY_BUYER',
  CANCELLED_BY_SELLER = 'CANCELLED_BY_SELLER',

  ENDED_WITH_DISPUTES = 'ENDED_WITH_DISPUTES',
}

export const ActiveOrderStatuses: OrderStatuses[] = [
  OrderStatuses.CREATED, 
  OrderStatuses.IN_PROGRESS, 
  OrderStatuses.AVAILABLE_FOR_PICKUP, 
]

export const EndedOrderStatuses: OrderStatuses[] = [
  OrderStatuses.COMPLETED,
  OrderStatuses.CONFIRMED,
  OrderStatuses.ENDED_WITH_DISPUTES,

  OrderStatuses.CANCELLED_BY_BUYER,
  OrderStatuses.CANCELLED_BY_SELLER,
]

export enum QuoteRequestStatuses {
  PENDING = 'PENDING',
  PROCESSED = 'PROCESSED', // Means seller has responded

  CANCELLED_BY_BUYER = 'CANCELLED_BY_BUYER',  // Means buyer cancelled before seller responded
  ENDED_BY_BUYER = 'ENDED_BY_BUYER',          // Means buyer cancelled AFTER seller responded
  ORDER_CREATED = 'ORDER_CREATED',
  
  EXPIRED = 'EXPIRED',
}

export enum OrderDeliveryLocationStatuses {
  PENDING = 'PENDING',
  LOADING = 'LOADING',
  IN_TRANSIT = 'IN_TRANSIT',
  ON_SITE = 'ON_SITE',

  DISCHARGE_REQUESTED = 'DISCHARGE_REQUESTED',
  DISCHARGE_REQUEST_CONFIRMED = 'DISCHARGE_REQUEST_CONFIRMED',

  DELIVERY_CONFIRMATION_REQUESTED = 'DELIVERY_CONFIRMATION_REQUESTED',
  DELIVERY_CONFIRMED = 'DELIVERY_CONFIRMED',
  DELIVERY_DISPUTE = 'DELIVERY_DISPUTE',
}


export enum OrderPaymentStatuses {
  BUYER_PAYMENT_PENDING = 'BUYER_PAYMENT_PENDING',
  BUYER_PAYMENT_IN_ESCROW = 'BUYER_PAYMENT_IN_ESCROW',
  ESCROW_FUNDS_MOVED_TO_SELLER = 'ESCROW_FUNDS_MOVED_TO_SELLER',
}

export default OrderStatuses