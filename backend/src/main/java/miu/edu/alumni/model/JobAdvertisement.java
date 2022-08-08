package miu.edu.alumni.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import org.springframework.boot.convert.DataSizeUnit;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
public class JobAdvertisement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    private String title;

    @Column(length = 1000)
    private String description;

    private String benefit;
    private String state;
    private String city;
    private String company;
    private double salary;
    private LocalDateTime posted;

    @ManyToMany()
    private List<Tag> tags;
    @OneToMany(mappedBy = "advertisement", fetch = FetchType.LAZY)
    private List<FileEntity> files;

}
