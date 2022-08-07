package miu.edu.alumni.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Data
@EntityListeners(AuditingEntityListener.class)
public class FileEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(unique = true)
    private String name;
    private String originalName;
    private Long size;
    private String type;
    private String location;
    @CreatedBy
    private String createdBy;
    @CreatedDate
    private Instant createdDate;

    @ManyToOne
    @JoinColumn(name="advertisement_id")
    @JsonBackReference
    private JobAdvertisement advertisement;
}
