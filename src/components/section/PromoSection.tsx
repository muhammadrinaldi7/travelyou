import endpoints from '@/api/endpoints';
import { useFetchPromo } from '@/api/hooks/Promo/useFetchPromo';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';

export const PromoBanner = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
   const {data:promos, isLoading, error} = useFetchPromo(endpoints.promo)
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
        <section className="container py-5 mx-auto bg-gradient-to-b from-gray-100 to-white"  id='promo'>
        {/* Banner */}
        <h1 className='mb-2 text-2xl text-center md:text-6xl text-primary-300 font-tittle'>Promo Terbaru</h1>
        <div className="container px-10 mx-auto">
                <Slider {...settings}>
                        {banners.map((banner, index) => (
                            <div key={index} className="relative flex items-center justify-center h-64 gap-10">
                                <Image
                                    width={1000}
                                    height={1000}
                                    src={banner.imageUrl}
                                    alt={banner.name}
                                    className="object-cover w-full h-full rounded-lg shadow-md"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                                    <h1 className="text-3xl font-bold text-center text-white">{banner.name}</h1>
                                </div>
                            </div>
                        ))}
                    </Slider>
        </div>
        {/* Promo List */}
        <div className="flex flex-col w-full p-4 mt-5">
            {/* <h2 className="text-2xl font-semibold">Promo Terbaru</h2> */}
            <Link href={'/'} className='self-end mr-5 hover:underline hover:text-primary-200'>See All</Link>
            <ul className="grid grid-cols-1 gap-3 px-6 mt-4 md:grid-cols-3">
                {isLoading ? <p>Loading...</p> : promos?.data?.slice(0,3).map((promo) => (
                    <li key={promo.id} className="overflow-auto transition rounded-lg shadow hover:shadow-primary-300 hover:shadow-lg">
                        <Image
                            width={1000}
                            height={100}
                            alt={promo.title}
                            src={promo.imageUrl}
                            className="object-cover object-center w-full h-36"
                        />
                        <div className="flex flex-col w-full px-4 py-2 bg-white">
                            <a href="#">
                                <h3 className="mt-0.5 text-lg text-gray-900">{promo.title}</h3>
                            </a>
                            <p className="mt-2 text-gray-500 line-clamp-3 text-sm/relaxed">
                               Diskon <span className='font-bold'>Rp. {promo.promo_discount_price.toLocaleString()}</span>
                            </p>
                            <Link href={`/user/promo/${promo.id}`} className='inline-flex items-center self-end gap-2 px-8 py-3 text-white border rounded border-primary-300 bg-primary-300 hover:bg-transparent hover:text-primary-300 focus:outline-none focus:ring active:text-primary-100'>Lihat Promo</Link>
                        </div>
                    </li>
                )) }
            </ul>
        </div>
    </section>
    )
}