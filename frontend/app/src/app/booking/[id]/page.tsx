import Link from 'next/link';

async function getBookings(bookingId:string) {
  const res = await fetch(`http://host.docker.internal:5000/api/bookings/${bookingId}`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch bookings');
  }

  const data = await res.json();
  console.log('Fetched bookings:', data); 

  return data;
}

const BookingPage: React.FC<{ params: { id: string } }> = async ({ params }) => {
  const booking = await getBookings(params.id);
  console.log('Params ID:', params.id); 



  if (!booking) {
    return (
      <div>
        <h1>Error</h1>
        <p>Booking not found.</p>
        <Link href="/">Back</Link>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
  <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
    <h1 className="text-3xl font-extrabold text-center text-[#0c55cc] mb-6 tracking-wide">
      Booking Details
    </h1>
    
    {/* Booking Information */}
    <p className="text-lg font-semibold text-gray-800 mb-2">
      {booking.service}
    </p>
    <p className="text-md text-gray-600 mb-4">
      Doctor: {booking.doctor_name}
    </p>

    <hr className="my-6" />

    {/* Time Details */}
    <div className="flex justify-between text-gray-700">
      <p className="font-semibold">Start Time: {booking.start_time}</p>
      <p className="font-semibold">End Time: {booking.end_time}</p>
    </div>

    {/* Date */}
    <p className="text-gray-700 mt-6">
      Date: {new Date(booking.date).toLocaleDateString()}
    </p>

    {/* Back Button */}
    <div className="mt-8 text-center">
      <Link href="/">
        <p className="cursor-pointer inline-block text-[#0c55cc] border border-[#0c55cc] rounded-lg py-2 px-6 hover:bg-[#0c55cc] hover:text-white transition-all duration-300">
          ← Back
        </p>
      </Link>
    </div>
  </div>
</div>

  );
};

export default BookingPage;