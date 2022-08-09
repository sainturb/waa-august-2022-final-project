package miu.edu.alumni.config;

import miu.edu.alumni.dto.UserRequest;

import java.util.List;

public class Constants {

    public static List<UserRequest> DEFAULT_USERS = List.of(
            new UserRequest("faculty", "Jonny", "Ivy", "faculty@miu.edu", "faculty", "faculty", "5 N 5th Street", "Fairfield", "Iowa", "52556"),
            new UserRequest("student", "Henry", "Ford", "student@miu.edu", "student", "student", "566 N 3rd Street", "Springfield", "California", "90005"),
            new UserRequest("admin", "Bob", "Delon", "admin@miu.edu", "admin", "admin", "110 N 17th Street", "Howdy", "Los Angeles", "90001")
            );
}
