import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Year.css'
const Year = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 }, (_, index) => currentYear - index);

  const [selectedYear, setSelectedYear] = useState('2024'); // Đặt giá trị mặc định là '2024'
  const [yearlyTotalPrice, setYearlyTotalPrice] = useState(null);
  const [monthlyTotalPrice, setMonthlyTotalPrice] = useState(null);
  const apiUrl = 'https://bookinghomestayfpt.azurewebsites.net';

  const fetchMonthlyTotalPrice = async (year) => {
    try {
      const response = await axios.get(`${apiUrl}/api/bookings/admin/monthlyTotalPrice/${year}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return {};
    }
  };

  useEffect(() => {
    // Khi component được tạo lần đầu tiên, gọi handleChange với giá trị mặc định '2024'
    handleChange({ target: { value: '2024' } });
  }, []);

  const handleChange = async (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    try {
      const yearlyResponse = await axios.get(`${apiUrl}/api/bookings/admin/yearlyTotalPrice/${year}`);
      setYearlyTotalPrice(yearlyResponse.data);

      const monthlyResponse = await fetchMonthlyTotalPrice(year);
      setMonthlyTotalPrice(monthlyResponse);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fillMissingMonths = (monthlyData) => {
    const filledData = {};
    for (let month = 1; month <= 12; month++) {
      filledData[month] = monthlyData.hasOwnProperty(month.toString()) ? monthlyData[month.toString()] : 0;
    }
    return filledData;
  };

  return (

    <div>
      <label htmlFor="year">Year:</label>
      <select id="year" value={selectedYear} onChange={handleChange}>
        <option value="">Year</option>
        {years.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
      {yearlyTotalPrice !== null && (
        <div>
          <p>Total Price for {selectedYear}: {yearlyTotalPrice}</p>
          {monthlyTotalPrice !== null && (
            <div>
              <div className="month-container">
                {Object.entries(fillMissingMonths(monthlyTotalPrice)).map(([month, totalPrice]) => (
                  <div className="month-admin" key={month}>Month {month}: {totalPrice}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
    // <div>
    //   <label htmlFor="year">Year:</label>
    //   <select id="year" value={selectedYear} onChange={handleChange}>
    //     <option value="">Year</option>
    //     {years.map(year => (
    //       <option key={year} value={year}>{year}</option>
    //     ))}
    //   </select>
    //   <div className='month-admin'>
    //     <div>Month 1: </div>
    //     <div>Month 2: </div>
    //     <div>Month 3: </div>
    //     <div>Month 4: </div>
    //     <div>Month 5: </div>
    //     <div>Month 6: </div>
    //     <div>Month 7: </div>
    //     <div>Month 8: </div>
    //     <div>Month 9: </div>
    //     <div>Month 10: </div>
    //     <div>Month 11: </div>
    //     <div>Month 12: </div>
    //   </div>


    // </div>

  );
};

export default Year;
