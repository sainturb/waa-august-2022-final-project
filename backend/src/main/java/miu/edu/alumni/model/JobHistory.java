package miu.edu.alumni.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@EntityListeners(AuditingEntityListener.class)
@SQLDelete(sql = "UPDATE person SET is_deleted = true WHERE id=?")
@Where(clause = "is_deleted=false")
public class JobHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    private String companyName;
    private Instant startDate;
    private Instant endDate;
    private String reasonToLeave;

    private Boolean is_deleted = false;

    @CreatedBy
    private String createdBy;

    @CreatedDate
    private Instant createdDate;

    @OneToMany(mappedBy = "history", fetch = FetchType.LAZY)
    private List<Comment> comments;

    @OneToMany(mappedBy = "history", fetch = FetchType.LAZY)
    private List<Tag> tags;
}
