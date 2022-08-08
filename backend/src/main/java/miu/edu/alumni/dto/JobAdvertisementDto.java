package miu.edu.alumni.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class JobAdvertisementDto {
    private Long id;
    private String title;
    private String description;
    private String benefit;
    private String state;
    private String city;
    private String company;
    private double salary;
    private LocalDateTime posted;

    private List<TagDto> tags;
}
