import axios from "axios"

export const getBookings = async (userId: string) => {
  try{
    return await axios.get(`http://localhost:3333/api/bookings?userId=`+userId);
  } catch (e) {
    console.log(e)
  }
}