package com.example.roombookingsystembackend.Controller;

import com.example.roombookingsystembackend.Entity.Room;
import com.example.roombookingsystembackend.Pojo.RoomPojo;
import com.example.roombookingsystembackend.Service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/room")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @PostMapping("/save")
    public ResponseEntity<String> saveRoom(@RequestParam("roomImage") MultipartFile roomImage,
                                           @RequestParam("roomName") String roomName,
                                           @RequestParam("categoryId") Integer categoryId,
                                           @RequestParam("roomPrice") double roomPrice) {
        try {
            RoomPojo roomPojo = new RoomPojo();
            roomPojo.setRoomName(roomName);
            roomPojo.setCategoryId(categoryId);
            roomPojo.setRoomPrice(roomPrice);
            roomPojo.setRoomImage(roomImage);

            roomService.saveRoom(roomPojo);
            return ResponseEntity.ok("Room saved successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error occurred while saving room: " + e.getMessage());
        }
    }

    @GetMapping("/findAll")
    public List<Room> findAll() {
        return roomService.findAll();
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<Room> getRoomById(@PathVariable("id") Integer id) {
        Optional<Room> room = roomService.getRoomById(id);
        return room.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteRoomById(@PathVariable("id") Integer id) {
        roomService.deleteRoomById(id);
        return ResponseEntity.noContent().build();
    }
}
