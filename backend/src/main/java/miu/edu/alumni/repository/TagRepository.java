package miu.edu.alumni.repository;

import miu.edu.alumni.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Long> {
    List<Tag> findAllByIdIn(List<Long> tags);

    List<Tag> findAllByNameContains(String name);
}
