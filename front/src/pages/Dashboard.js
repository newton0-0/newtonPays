import { useEffect, useState } from "react";
import TransactionHistory from "../components/TransactionHistory";
import Transaction from "../components/Transaction";
import UtilityUserFunctions from "../components/Utility"
import { Grid } from "@mui/material";

export default function Dashboard() {
  const id = localStorage.getItem('username');

  const [userData, setUser] = useState([]);
  const [userCoupons, setCoupons] = useState([]);
  const [userTransactions, setTransactions] = useState([]);
  async function fetchUser() {
    const res = await fetch('/user/profile', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'authorization': id
            }
          });
    const user = await res.json();

    setUser(user.data.userData);
    setCoupons(user.data.userData.offers);
    setTransactions(user.data.userTransactions);
  }
  useEffect(() => {
    fetchUser();
  },[])
  console.log("user coupons", userCoupons);

    return (
        <div>
        <Grid container direction="row">
            <Grid className='navbarBlock' xs={2}><b>Welcome</b></Grid>
            <Grid className='navbarBlock' xs={7}><h3><b>Newton Pay</b></h3></Grid>
            <Grid className='navbarBlock' xs={3}>LogOut</Grid>
        </Grid>
    <Grid container direction="row" style={{ height: '100vh' }}>
      {/* First component - takes half of the screen and is not scrollable */}
      <Grid item xs={8} sm={6} style={{ overflowY: 'hidden' }}>
        {/* Your first component content goes here */}
        <div className="transactionTab">
          <Transaction />
        </div>
        <UtilityUserFunctions balance={userData.balance} coupons={userCoupons}/>
        {console.log("coupons2", userCoupons)}
      </Grid>

      {/* Second component - takes half of the screen and is vertically scrollable */}
      <Grid item xs={12} sm={6} style={{ }}>
        {/* Your second component content goes here */}
        <div className="transactionHistoryTab">
          <TransactionHistory data={userTransactions}/>
        </div>
      </Grid>
    </Grid>
        </div>
    )
}