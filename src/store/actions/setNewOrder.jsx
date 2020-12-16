export default function setNewOrder(order) {
  return { type: 'ADD_ORDER', payload: order}
}