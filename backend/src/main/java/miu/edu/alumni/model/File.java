package miu.edu.alumni.model;

import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Data
public class File {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    private String name;
    private String originalName;
    private Float size;
    private String type;
    private String location;
    @CreatedBy
    private String createdBy;
    @CreatedDate
    private Instant createdDate;

    @ManyToOne
    @JoinColumn(name="advertisement_id")
    private JobAdvertisement advertisement;
}
