package com.appointment.controller;

import com.appointment.model.Appointment;
import com.appointment.service.AppointmentService;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/appointments")
@CrossOrigin(origins = "*")
public class AppointmentController {
    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PostMapping("/create")
    public Map<String, Object> createAppointment(@RequestBody Appointment appointment) {
        Map<String, Object> response = new HashMap<>();
        try {
            appointmentService.createAppointment(appointment);
            response.put("status", "success");
            response.put("message", "Appointment booked successfully");
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", e.getMessage());
        }
        return response;
    }

    @GetMapping("/list")
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    @GetMapping("/{id}")
    public Appointment getAppointmentById(@PathVariable Long id) {
        return appointmentService.getAppointmentById(id);
    }

    @DeleteMapping("/{id}")
    public Map<String, Object> deleteAppointment(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            appointmentService.deleteAppointment(id);
            response.put("status", "success");
            response.put("message", "Appointment deleted successfully");
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", e.getMessage());
        }
        return response;
        
    }
}
