package com.example.roombookingsystembackend.Controller;


//import com.GyanSarathi.Margadarshan.dto.AdminDto;
//import com.GyanSarathi.Margadarshan.response.OtpResponse;
//import com.GyanSarathi.Margadarshan.response.OtpResponseAdmin;
//import com.GyanSarathi.Margadarshan.service.AdminService;
import com.example.roombookingsystembackend.Pojo.AdminDto;
import com.example.roombookingsystembackend.Service.AdminService;
import com.example.roombookingsystembackend.response.OtpResponse;
import com.example.roombookingsystembackend.response.OtpResponseAdmin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class AdminController {

    private final AdminService adminService;


    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/admin-otp-request")
    public ResponseEntity<?> sendOtp(@RequestBody AdminDto adminDto){
        OtpResponse otpResponse = adminService.generateOtpToEmail(adminDto.getAdminEmail());
        return ResponseEntity.ok(otpResponse);
    }

    @PostMapping("/validate-admin-otp")
    public ResponseEntity<?> validateOtp(@RequestBody AdminDto adminDto){
        OtpResponseAdmin otpResponse = adminService.validateOtp(adminDto.getAdminEmail(),adminDto.getOtp());
        return ResponseEntity.ok(otpResponse);
    }



}
