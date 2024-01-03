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
    const i=0;
    
    return (
        <div className="utility">
            <h1 className="checkBalance">Balance : {props.balance}</h1>
            {coupons.map((coupon) => (
                <div className="coupon">
                    <p className="couponTitle">{coupon.offerId.title}</p>
                    <p className="couponCashback">{coupon.offerId.description}</p>
                    <p className="couponValidity">{coupon.offerId.code}</p>
                </div>
            )
            )}
        </div>
    )
}