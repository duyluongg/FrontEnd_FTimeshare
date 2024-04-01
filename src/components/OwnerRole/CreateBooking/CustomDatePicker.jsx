// import * as React from 'react';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
// import dayjs from 'dayjs';

// export default function CustomDatePicker({ bookedDates }) {
//   const isDateBookedOrBetween = (date) => {
//     const day = dayjs(date);

//     const formattedDate = day.format('DD/MM/YYYY');
//     if (bookedDates.includes(formattedDate)) {
//       return true;
//     }

//     // Check if the date is between booked dates
//     for (let i = 0; i < bookedDates.length - 1; i++) {
//       const startDate = dayjs(bookedDates[i], 'DD/MM/YYYY');
//       const endDate = dayjs(bookedDates[i + 1], 'DD/MM/YYYY');
//       if (day.isAfter(startDate) && day.isBefore(endDate)) {
//         return true;
//       }
//     }

//     return false;
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer components={['DatePicker']}>
//         <DatePicker
//           label="Custom date picker"
//           shouldDisableDate={isDateBookedOrBetween}
//           value={dayjs(props.selectedDate)} // sử dụng selectedDate từ props để hiển thị giá trị đã chọn
//           onChange={(date) => props.onChange(date.format('YYYY-MM-DD'))} // khi người dùng chọn ngày, gọi hàm onChange và truyền ngày đã chọn (dạng YYYY-MM-DD)
//         />

//       </DemoContainer>
//     </LocalizationProvider>
//   );
// }
import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

export default function CustomDatePicker({ bookedDates, selectedDate, onChange }) {
  const isDateBookedOrBetween = (date) => {
    const day = dayjs(date);

    const formattedDate = day.format('DD/MM/YYYY');
    if (bookedDates.includes(formattedDate)) {
      return true;
    }

    // Check if the date is between booked dates
    for (let i = 0; i < bookedDates.length - 1; i++) {
      const startDate = dayjs(bookedDates[i], 'DD/MM/YYYY');
      const endDate = dayjs(bookedDates[i + 1], 'DD/MM/YYYY');
      if (day.isAfter(startDate) && day.isBefore(endDate)) {
        return true;
      }
    }

    return false;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          label="Date"
          shouldDisableDate={isDateBookedOrBetween}
          value={dayjs(selectedDate)} 
          onChange={(date) => onChange(date.format('YYYY-MM-DD'))} 
          disablePast
     
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
