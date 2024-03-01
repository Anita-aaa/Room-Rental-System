package com.example.roombookingsystembackend.response;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class OtpResponseAdmin {

    private String message;
    private String otp;
}
