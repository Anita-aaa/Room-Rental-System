package com.example.roombookingsystembackend.Service.Impl;

import com.example.roombookingsystembackend.Repo.AdminRepository;
import com.example.roombookingsystembackend.Service.AdminService;
import com.example.roombookingsystembackend.response.OtpResponse;
import com.example.roombookingsystembackend.response.OtpResponseAdmin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Random;

@Service
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;

    private final JavaMailSender javaMailSender;

    @Autowired
    public AdminServiceImpl(AdminRepository adminRepository, JavaMailSender javaMailSender) {
        this.adminRepository = adminRepository;
        this.javaMailSender = javaMailSender;
    }

    public String generateOtp(){
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }

    @Override
    public OtpResponse generateOtpToEmail(String email) {
        SimpleMailMessage message = new SimpleMailMessage();
        boolean emailExists = adminRepository.emailExists(email);
        if(emailExists){
            String otp = generateOtp();
            adminRepository.updateOtp(otp,email);
            message.setTo(email);
            message.setSubject("RoomBookingSystem Admin OTP");
            message.setText("Hello Admin! Your otp is: " + otp);
            javaMailSender.send(message);
            return new OtpResponse("Otp sent to admin");
        }else {
            return new OtpResponse("Admin does not exist");
        }
    }

    @Override
    public OtpResponseAdmin validateOtp(String email, String Otp) {
        String otp = adminRepository.otp(email);
        if(Objects.equals(Otp,otp)){
            return new OtpResponseAdmin("Otp verified",otp);
        }else {
            return new OtpResponseAdmin("Otp does not match!",otp);
        }
    }
}
