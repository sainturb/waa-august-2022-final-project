package miu.edu.alumni.model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    private String name;

    @ManyToMany(mappedBy="tags")
    private List<JobAdvertisement> advertisements;

    @ManyToMany(mappedBy="tags")
    private List<JobHistory> histories;
}
