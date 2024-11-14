import Image from 'next/image';
import Slider from 'react-slick';

export const PromoBanner = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
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
    const banners = [
        {
            "id": "cdbcb029-5ca3-44f7-83f3-852cbeeba838",
            "name": "Disney",
            "imageUrl": "https://travel-journal-api-bootcamp.do.dibimbing.id/images/1730792183140-disneey.jpg",
            "createdAt": "2024-11-04T13:24:14.593Z",
            "updatedAt": "2024-11-10T03:54:05.530Z"
        },
        {
            "id": "9b93043d-34fb-481c-bd18-5a4dec44df3c",
            "name": "Australia",
            "imageUrl": "https://travel-journal-api-bootcamp.do.dibimbing.id/images/1731498367395-191011110307-02-australia-beautiful-places.jpg",
            "createdAt": "2024-11-13T11:46:07.532Z",
            "updatedAt": "2024-11-13T11:46:07.532Z"
        },
        {
            "id": "803ad66c-1641-49bf-a5bd-970140bc1683",
            "name": "Banner edit",
            "imageUrl": "https://www.ancol.com/shared/file-manager/Unit%20Informasi/DUFAN/WAHANA-DUFAN---ICE-AGE.jpg",
            "createdAt": "2024-11-10T03:08:20.874Z",
            "updatedAt": "2024-11-13T15:26:20.279Z"
        }
    ]
    return(
        <section className="py-5 container mx-auto bg-gray-100"  id='promo'>
        {/* Banner */}
        <h1 className='text-2xl md:text-6xl text-primary-300 text-center font-tittle mb-2'>Promo Terbaru</h1>
        <div className="container px-10 mx-auto">
                <Slider {...settings}>
                        {banners.map((banner, index) => (
                            <div key={index} className="relative gap-10 h-64 flex items-center justify-center">
                                <Image
                                    width={1000}
                                    height={1000}
                                    src={banner.imageUrl}
                                    alt={banner.name}
                                    className="w-full h-full object-cover rounded-lg shadow-md"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                                    <h1 className="text-white text-3xl font-bold text-center">{banner.name}</h1>
                                </div>
                            </div>
                        ))}
                    </Slider>
        </div>
        {/* Promo List */}
        <div className="mt-5 p-4">
            {/* <h2 className="text-2xl font-semibold">Promo Terbaru</h2> */}
            <ul className="mt-4 mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-3">
                {promos.slice(0,3).map((promo) => (
                    <li key={promo.id} className="overflow-auto rounded-lg shadow transition hover:shadow-primary-300 hover:shadow-lg">
                        <Image
                            width={1000}
                            height={100}
                            alt={promo.title}
                            src={promo.imageUrl}
                            className="h-36 w-full object-center object-cover"
                        />
                        <div className="bg-white w-full flex flex-col p-4 sm:p-6">
                            <time dateTime={promo.updatedAt} className="block text-xs text-gray-500"> {promo.updatedAt} </time>
                            <a href="#">
                                <h3 className="mt-0.5 text-lg text-gray-900">{promo.title}</h3>
                            </a>
                            <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                            {promo.description}
                            </p>
                            <button className='self-end inline-flex items-center gap-2 rounded border border-primary-300 bg-primary-300 px-8 py-3 text-white hover:bg-transparent hover:text-primary-300 focus:outline-none focus:ring active:text-primary-100'>Ambil Promo</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </section>
    )
}