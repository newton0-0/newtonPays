import { useEffect, useState } from "react";

export default function UtilityUserFunctions(props) {
    console.log("props",props.coupons);
    const coupons = props.coupons;
    // async function fetchCoupons() {
    //     const res = await fetch('/payment/get-coupons', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     });
    //     const couponsData = await res.json();
    //     setCoupons(couponsData.data);
    // }
    // console.log(coupons);
    
    return (
        <div className="utility">
            <h2 className="checkBalance">Balance : {Math.round((props.balance)*100)/100}</h2>
        <div className="utilityCoupons">
            <b style={{color:"white"}}>coupons here</b>
            {coupons && coupons.map((coupon) => (
                <div className="coupon">
                    <p className="couponTitle">{coupon.offerId.title}</p>
                    <p className="couponCashback">{coupon.offerId.description.slice(0,30)+ '...'}</p>
                    <p className="couponValidity">coupon code : <b>{coupon.offerId.code}</b></p>
                    <p className="couponValidity">expiring on {coupon.validUpto.toString().slice(0,10)}</p>
                </div>
            )
            )}
        </div>
        </div>
    )
}