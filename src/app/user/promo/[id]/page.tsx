// import Image from "next/image"
'use client'

import Image from "next/image"
import { useParams } from "next/navigation"

// import { useParams } from "next/navigation"
// import React, { useState } from "react"

export default function PromoDetail() {
    const promos = [
        {
            "id": "b541b006-dc01-4890-8f99-251e53327780",
            "title": "Pulau 1k 🙏",
            "description": "renang gratis",
            "imageUrl": "https://travel-journal-api-bootcamp.do.dibimbing.id/images/1731497960862-profil-2024.jpg",
            "terms_condition": "<p>Discount coupon of 15% (maximum value of IDR 150,000) with a minimum transaction of IDR 50,000 in one booking code.</p>",
            "promo_code": "BELI2",
            "promo_discount_price": 200000,
            "minimum_claim_price": 300000,
            "createdAt": "2024-11-12T08:55:36.376Z",
            "updatedAt": "2024-11-13T11:39:23.505Z"
        },
        {
            "id": "f75065f6-289e-4aa5-af6f-ede458018dc4",
            "title": "Staycation ",
            "description": "Menikmati Liburan akhir pekan",
            "imageUrl": "https://travel-journal-api-bootcamp.do.dibimbing.id/images/1730775872832-bali.webp",
            "terms_condition": "discount 15%",
            "promo_code": "Beli 2",
            "promo_discount_price": 10000,
            "minimum_claim_price": 20000,
            "createdAt": "2024-11-05T03:04:32.922Z",
            "updatedAt": "2024-11-05T11:01:29.430Z"
        },
        {
            "id": "c0b44b97-3f8f-463f-bfdb-3750686f796e",
            "title": "Staycation 3",
            "description": "Liburan  tahun baru",
            "imageUrl": "https://travel-journal-api-bootcamp.do.dibimbing.id/images/1731284786825-bali.webp",
            "terms_condition": "discount 20%",
            "promo_code": "30A",
            "promo_discount_price": 20000,
            "minimum_claim_price": 50000,
            "createdAt": "2024-11-11T00:26:27.017Z",
            "updatedAt": "2024-11-11T00:26:27.017Z"
        },
        {
            "id": "a6441112-f0b7-4bd3-b515-77632494a101",
            "title": "Staycation 5",
            "description": "Menikmati Liburan akhir pekan",
            "imageUrl": "https://travel-journal-api-bootcamp.do.dibimbing.id/images/1731285208795-indo.jpg",
            "terms_condition": "discount 15%",
            "promo_code": "22d",
            "promo_discount_price": 20000,
            "minimum_claim_price": 300000,
            "createdAt": "2024-11-11T00:33:28.952Z",
            "updatedAt": "2024-11-11T00:33:28.952Z"
        },
        {
            "id": "10fe2080-5604-42c4-88d6-21eb518c105a",
            "title": "Staycation 7",
            "description": "Menikmati Liburan akhir pekan",
            "imageUrl": "https://travel-journal-api-bootcamp.do.dibimbing.id/images/1731285359453-indo.jpg",
            "terms_condition": "discount 20%",
            "promo_code": "3b",
            "promo_discount_price": 3000,
            "minimum_claim_price": 3000,
            "createdAt": "2024-11-11T00:35:59.621Z",
            "updatedAt": "2024-11-11T00:35:59.621Z"
        },
        {
            "id": "5190dc67-170e-4bc8-b28f-8ad938c30d50",
            "title": "Staycation Brings 1",
            "description": "Friendly reminder, family staycation shall be forever memorable ✨ Book staycation now with discount up to Rp1 mio for Hotels, Villas & Resorts to celebrate Ramadan moments with your loved ones to celebrate Ramadan and Lebaran moments",
            "imageUrl": "https://travel-journal-api-bootcamp.do.dibimbing.id/images/1730805037155-liburan.jpg",
            "terms_condition": "<p>Discount coupon of 15% (maximum value of IDR 150,000) with a minimum transaction of IDR 50,000 in one booking code.</p>",
            "promo_code": "BELI2",
            "promo_discount_price": 100000,
            "minimum_claim_price": 500000,
            "createdAt": "2024-11-01T03:31:39.469Z",
            "updatedAt": "2024-11-06T06:31:01.713Z"
        },
        {
            "id": "9a429da4-e6c9-4ace-bf97-cca248dc721f",
            "title": "Staycation",
            "description": "Menikmati Liburan akhir pekan",
            "imageUrl": "https://travel-journal-api-bootcamp.do.dibimbing.id/images/1730792946047-disneey.jpg",
            "terms_condition": "discount 20%",
            "promo_code": "67t",
            "promo_discount_price": 22222,
            "minimum_claim_price": 4444,
            "createdAt": "2024-11-05T07:49:06.210Z",
            "updatedAt": "2024-11-06T07:31:03.640Z"
        },
        {
            "id": "75025348-e652-4e44-8bcc-25270d8dcf42",
            "title": "Staycation Brings Silaturahmi 🙏",
            "description": "Friendly reminder, family staycation shall be forever memorable ✨ Book staycation now with discount up to Rp1 mio for Hotels, Villas & Resorts to celebrate Ramadan moments with your loved ones to celebrate Ramadan and Lebaran moments",
            "imageUrl": "https://travel-journal-api-bootcamp.do.dibimbing.id/images/1730947330129-akin-cakiner-9cikk-hld9k-unsplash.jpg",
            "terms_condition": "<p>Discount coupon of 15% (maximum value of IDR 150,000) with a minimum transaction of IDR 50,000 in one booking code.</p>",
            "promo_code": "BELI2",
            "promo_discount_price": 100000,
            "minimum_claim_price": 500000,
            "createdAt": "2024-11-06T06:25:23.374Z",
            "updatedAt": "2024-11-07T02:42:10.232Z"
        },
        {
            "id": "d1ce2c45-582f-4c1d-84e8-ca3f3a034221",
            "title": "Staycationsss",
            "description": "Menikmati Liburan akhir pekan",
            "imageUrl": "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit19201280gsm/events/2021/12/08/9c6ae660-1799-4276-b81d-f8b0b85669d6-1638949473006-1e6c55a1b1edca6bf250012af2cc79e2.jpg",
            "terms_condition": "discount 15%",
            "promo_code": "BELILIBE",
            "promo_discount_price": 52,
            "minimum_claim_price": 56,
            "createdAt": "2024-11-05T14:25:43.657Z",
            "updatedAt": "2024-11-05T14:25:43.657Z"
        }
    ]
    const param = useParams()
    const id = param.id as string
    const promo = promos.find((data)=> data.id == id)
    console.log(promo)
    return(
        <>
        <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col overflow-hidden bg-gray-100 rounded-lg shadow-lg md:flex-row">
                <h1></h1>
                {/* Gambar Promo */}
                <div className="relative w-full h-64 md:w-1/2 md:h-auto">
                <Image 
                    src={promo?.imageUrl || ''} 
                    alt={promo?.title || 'Profile'} 
                    layout="fill" 
                    objectFit="cover" 
                    className="transition-transform duration-300 transform hover:scale-105"
                />
                </div>

                {/* Detail Promo */}
                <div className="p-6 md:w-1/2">
                <h2 className="mb-4 text-3xl font-bold text-gray-800">{promo?.title}</h2>
                <p className="mb-4 text-gray-600">{promo?.description}</p>
                
                <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold text-red-500">{promo?.terms_condition}% OFF</span>
                    <span className="ml-2 text-gray-500">Valid until: {promo?.terms_condition}</span>
                </div>

                <div className="flex items-center mb-4">
                    <span className="px-3 py-1 font-bold text-white bg-blue-500 rounded-md">{promo?.promo_code}</span>
                </div>

                <p className="mb-6 text-gray-600">Terms and conditions apply.</p>

                <button className="px-6 py-3 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600">
                    Claim This Promo
                </button>
                </div>
            </div>
        </div>
        </>
    )
  }