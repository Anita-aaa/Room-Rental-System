package com.example.roombookingsystembackend;

import com.example.roombookingsystembackend.Entity.Category;
import com.example.roombookingsystembackend.Entity.Room;
import com.example.roombookingsystembackend.Repo.CategoryRepo;
import com.example.roombookingsystembackend.Repo.RoomRepo;
//import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

@DataJpaTest
public class RoomRepositoryTest {
    @Autowired
    private RoomRepo RoomRepo;
    @Autowired
    private CategoryRepo CategoryRepo;
    @Test
    public void saveRoom() {
        // Create a category
        Category category = new Category();
        category.setName("Test Category");
        category = CategoryRepo.save(category);

        // Create a room
        Room room = new Room();
        room.setRoomName("Test Room");
        room.setRoomPrice(100.00);
        room.setCategory(category);

        // Save the room
        room = RoomRepo.save(room);

        // Check if the room is saved
        Assertions.assertNotNull(room.getId());
    }
    @Test
    public void findRoomById() {
        // Create a category
        Category category = new Category();
        category.setName("Test Category");
        category = CategoryRepo.save(category);

        // Create a room
        Room room = new Room();
        room.setRoomName("Test Room");
        room.setRoomPrice(100.00);
        room.setCategory(category);
        room = RoomRepo.save(room);

        // Find the room by ID
        Room foundRoom = RoomRepo.findById(room.getId()).orElse(null);

        // Check if the room is found
        Assertions.assertNotNull(foundRoom);
        Assertions.assertEquals(room.getId(), foundRoom.getId());
    }
    @Test
    public void updateRoom() {
        // Create a category
        Category category = new Category();
        category.setName("Test Category");
        category = CategoryRepo.save(category);

        // Create a room
        Room room = new Room();
        room.setRoomName("Test Room");
        room.setRoomPrice(100.00);
        room.setCategory(category);
        room = RoomRepo.save(room);

        // Update room details
        room.setRoomName("Updated Room Name");
        room.setRoomPrice(150.00);
        RoomRepo.save(room);

        // Retrieve the updated room
        Room updatedRoom = RoomRepo.findById(room.getId()).orElse(null);

        // Check if room is updated
        Assertions.assertNotNull(updatedRoom);
        Assertions.assertEquals("Updated Room Name", updatedRoom.getRoomName());
        Assertions.assertEquals(150.00, updatedRoom.getRoomPrice());
    }


    @Test
    public void deleteRoom() {
        // Create a category
        Category category = new Category();
        category.setName("Test Category");
        category = CategoryRepo.save(category);

        // Create a room
        Room room = new Room();
        room.setRoomName("Test Room");
        room.setRoomPrice(100.00);
        room.setCategory(category);
        room = RoomRepo.save(room);

        // Delete the room
        RoomRepo.deleteById(room.getId());

        // Try to find the room by ID
        Room deletedRoom = RoomRepo.findById(room.getId()).orElse(null);

        // Check if the room is deleted
        Assertions.assertNull(deletedRoom);
    }
//    public void saveRoom(){
//        Room room=new Room();
//        room.setRoomName("single bed");
//        room.setRoomImage("C://Users//at994//Downloads//RoomBookingSystem-main//RoomBookingSystem-main//RoomBookingSystem//RoomBookingSystem-Backend//Room-Images//Rooms-images//large_superior-double.jpg");
//        room.setRoomPrice(1000);
//        Category category = CategoryRepo.findByName("double size bed");
//        room.setCategory(category);
//        room=RoomRepo.save(room);
//    }
@Test
public void findAllRooms() {
    // Create a category
    Category category = new Category();
    category.setName("Test Category");
    category = CategoryRepo.save(category);

    // Create some rooms
    Room room1 = new Room();
    room1.setRoomName("Room 1");
    room1.setRoomPrice(100.00);
    room1.setCategory(category);
    RoomRepo.save(room1);

    Room room2 = new Room();
    room2.setRoomName("Room 2");
    room2.setRoomPrice(150.00);
    room2.setCategory(category);
    RoomRepo.save(room2);

    // Find all rooms
    List<Room> rooms = RoomRepo.findAll();

    // Check if rooms are found
    Assertions.assertEquals(2, rooms.size());
}

}
