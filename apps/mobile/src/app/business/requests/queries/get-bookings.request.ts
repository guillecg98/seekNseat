import axios from "axios"

export const getBookings = async (businessId: string) => {
  try{
    return await axios.get(`http://localhost:3333/api/bookings?businessId=`+businessId);
  } catch (e) {
    console.log(e)
  }
}