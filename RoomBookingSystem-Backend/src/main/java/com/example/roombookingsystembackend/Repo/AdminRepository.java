package com.example.roombookingsystembackend.Repo;

//import com.GyanSarathi.Margadarshan.entity.Admin;
import com.example.roombookingsystembackend.Entity.Admin;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin,Integer> {

    @Query(value = "SELECT EXISTS(SELECT 1 FROM Admins WHERE admin_email = ?1)", nativeQuery = true)
    boolean emailExists(String email);

    @Modifying
    @Transactional
    @Query(value = "UPDATE Admins SET otp = ?1 WHERE admin_email = ?2",nativeQuery = true)
    void updateOtp(String otp, String email);

    @Query(value = "SELECT otp from Admins where admin_email=?1",nativeQuery = true)
    String otp(String email);

}
