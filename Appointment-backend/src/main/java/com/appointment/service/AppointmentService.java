package com.appointment.service;

import com.appointment.model.Appointment;
import com.appointment.model.Doctor;
import com.appointment.repository.AppointmentRepository;
import com.appointment.repository.DoctorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final DoctorRepository doctorRepository;

    public AppointmentService(AppointmentRepository appointmentRepository,
                              DoctorRepository doctorRepository) {
        this.appointmentRepository = appointmentRepository;
        this.doctorRepository = doctorRepository;
    }

    public Appointment createAppointment(Appointment appointment) {
        if (appointment.getDoctor() != null && appointment.getDoctor().getId() != null) {
            Doctor doctor = doctorRepository.findById(appointment.getDoctor().getId())
                    .orElseThrow(() -> new RuntimeException("Doctor not found"));
            appointment.setDoctor(doctor);
        }
        return appointmentRepository.saveAndFlush(appointment);

    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Appointment getAppointmentById(Long id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found with id: " + id));
    }

    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }
}
