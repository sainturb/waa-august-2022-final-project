package miu.edu.alumni.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import org.hibernate.annotations.Fetch;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.Instant;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

    @OneToMany()
    @JoinColumn(name="advertisement_id")
    private Set<FileEntity> files = new HashSet<>();

    @ManyToMany()
    private List<Student> applied;

}
