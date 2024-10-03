import Link from 'next/link';

async function getBookings() {
  const res = await fetch('http://host.docker.internal:5000/api/getBookings', { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const formatTime = (timeString: string) => {
  const [hours, minutes] = timeString.split(' ')[0].split(':').map(Number);
  const period = timeString.split(' ')[1];
  
  let hour = hours;
  if (period === 'PM' && hour !== 12) hour += 12;
  if (period === 'AM' && hour === 12) hour = 0;

  const date = new Date();
  date.setHours(hour, minutes);

  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const Home: React.FC = async () => {
  const bookings = await getBookings();

  return (
    <div className='p-8 bg-gray-50 min-h-screen flex flex-col items-center gap-16'>
      {/* Title */}
      <h2 className="text-4xl font-extrabold text-[#0c55cc] mb-8 mt-[8vh] tracking-wide">
        Booking List
      </h2>
  
      {/* Booking Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {bookings.map((booking: any) => (
          <div 
            key={booking.id} 
            className="bg-white flex flex-col items-center justify-between w-64 p-6 shadow-xl rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:outline hover:outline-2 hover:outline-blue-500"
          >
            <p className="text-lg font-medium text-gray-800">{formatTime(booking.start_time)}</p>
            <p className="text-lg font-medium text-gray-800">{formatDate(booking.date)}</p>
            <Link href={`/booking/${booking.id}`}>
              <p className="text-lg mt-4 w-full text-center text-blue-600 font-semibold transition-colors duration-300 hover:text-[#0c55cc]">
                View Details
              </p>
            </Link>
          </div>
        ))}
      </div>
  
      {/* Add Booking Button */}
      <Link href={"/booking/newPage"}>
        <p className='w-full max-w-xs p-4 border-2 border-[#0c55cc] text-[#0c55cc] bg-white rounded-lg text-center text-lg font-semibold tracking-wide transition-all duration-300 cursor-pointer hover:bg-[#0c55cc] hover:text-white hover:border-[#0c55cc]'>
          + Add New Booking
        </p>
      </Link>
    </div>
  );
};  

export default Home;