// script.js
document.addEventListener('DOMContentLoaded', () => {
    const doctors = [
        { id: 1, name: 'Dr. Smith', availableSlots: 10, bookedSlots: 0 },
        { id: 2, name: 'Dr. Johnson', availableSlots: 8, bookedSlots: 0 },
    ];

    const appointments = [];

    // Populate doctor select options
    const doctorSelect = document.getElementById('doctor-select');
    doctors.forEach(doctor => {
        const option = document.createElement('option');
        option.value = doctor.id;
        option.textContent = doctor.name;
        doctorSelect.appendChild(option);
    });

    // Book an appointment
    document.getElementById('booking-form').addEventListener('submit', event => {
        event.preventDefault();

        const patientName = document.getElementById('patient-name').value;
        const doctorId = parseInt(document.getElementById('doctor-select').value);
        const appointmentDate = document.getElementById('appointment-date').value;
        const appointmentTime = document.getElementById('appointment-time').value;

        const doctor = doctors.find(doc => doc.id === doctorId);

        if (doctor && doctor.bookedSlots < doctor.availableSlots) {
            const appointmentId = appointments.length + 1;
            appointments.push({
                id: appointmentId,
                patientName,
                doctorName: doctor.name,
                date: appointmentDate,
                time: appointmentTime,
            });

            doctor.bookedSlots++;
            alert('Appointment booked successfully!');
            displayDoctors();
            document.getElementById('booking-form').reset();
        } else {
            alert('No available slots for the selected doctor.');
        }
    });

    // Cancel an appointment
    document.getElementById('cancellation-form').addEventListener('submit', event => {
        event.preventDefault();

        const appointmentId = parseInt(document.getElementById('appointment-id').value);
        const appointmentIndex = appointments.findIndex(app => app.id === appointmentId);

        if (appointmentIndex > -1) {
            const doctor = doctors.find(doc => doc.name === appointments[appointmentIndex].doctorName);
            if (doctor) {
                doctor.bookedSlots--;
            }

            appointments.splice(appointmentIndex, 1);
            alert('Appointment canceled successfully!');
            displayAppointments();
            displayDoctors();
            document.getElementById('cancellation-form').reset();
        } else {
            alert('Invalid appointment ID.');
        }
    });

    // View all appointments
    document.getElementById('view-appointments-btn').addEventListener('click', displayAppointments);

    // Display appointments
    function displayAppointments() {
        const appointmentsList = document.getElementById('appointments-list');
        appointmentsList.innerHTML = '';

        appointments.forEach(appointment => {
            const appointmentElement = document.createElement('div');
            appointmentElement.textContent = `ID: ${appointment.id}, Patient: ${appointment.patientName}, Doctor: ${appointment.doctorName}, Date: ${appointment.date}, Time: ${appointment.time}`;
            appointmentsList.appendChild(appointmentElement);
        });
    }

    // Display doctors
    function displayDoctors() {
        const doctorList = document.getElementById('doctor-list');
        doctorList.innerHTML = '';

        doctors.forEach(doctor => {
            const doctorElement = document.createElement('div');
            doctorElement.innerHTML = `
                <h3>${doctor.name}</h3>
                <p>Total Slots: ${doctor.availableSlots}</p>
                <p>Available Slots: ${doctor.availableSlots - doctor.bookedSlots}</p>
                <p>Booked Slots: ${doctor.bookedSlots}</p>
            `;
            doctorList.appendChild(doctorElement);
        });
    }

    // Initial display of doctors
    displayDoctors();
});
