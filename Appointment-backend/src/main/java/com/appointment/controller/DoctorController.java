package com.appointment.controller;

import com.appointment.model.Doctor;
import com.appointment.service.DoctorService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doctors")
@CrossOrigin(origins = "http://localhost:5173")
public class DoctorController {
    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @GetMapping("/list")
    public List<Doctor> getAllDoctors() {
        return doctorService.getAllDoctors();
    }
}
