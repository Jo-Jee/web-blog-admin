export default interface RefreshTokenPayload {
  type: 'refresh'
  uid: number
  exp: number
}
