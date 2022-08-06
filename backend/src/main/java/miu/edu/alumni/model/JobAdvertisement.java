package miu.edu.alumni.model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
public class JobAdvertisement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    private String description;
    private String benefits;

    @OneToMany(mappedBy="advertisement")
    private List<Tag> tags;
    @OneToMany(mappedBy = "advertisement")
    private List<FileEntity> files;

}
