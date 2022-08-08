package miu.edu.alumni.config;

import miu.edu.alumni.dto.UserRequest;

import java.util.List;

public class Constants {

    public static List<UserRequest> DEFAULT_USERS = List.of(
            new UserRequest("faculty", "Jonny", "Ivy", "faculty@miu.edu", "faculty"),
            new UserRequest("student", "Henry", "Ford", "student@miu.edu", "student"),
            new UserRequest("admin", "Bob", "Delon", "admin@miu.edu", "admin")
            );
}
