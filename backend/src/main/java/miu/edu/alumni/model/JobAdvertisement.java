package miu.edu.alumni.model;

import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.Instant;
import java.util.List;

@Entity
@Data
@EntityListeners(AuditingEntityListener.class)
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
    private Double salary;

    @CreatedBy
    private String createdBy;
    @CreatedDate
    private Instant posted;

    @ManyToMany()
    private List<Tag> tags;
    @OneToMany(mappedBy = "advertisement", fetch = FetchType.LAZY)
    private List<FileEntity> files;

    @ManyToMany()
    private List<Student> applied;

}
