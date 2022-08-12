package miu.edu.alumni.controller;

import com.google.common.eventbus.AllowConcurrentEvents;
import lombok.RequiredArgsConstructor;
import miu.edu.alumni.model.Comment;
import miu.edu.alumni.model.Tag;
import miu.edu.alumni.service.CommentServiceImpl;
import miu.edu.alumni.service.TagService;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("api/comments")
@RequiredArgsConstructor
public class CommentController {
    private final CommentServiceImpl commentService;

    @GetMapping("/{id}")
    @PostAuthorize("hasAnyRole(faculty, admin)")
    public List<Comment> findCommentsByStudent(@PathVariable Long id) {
        return commentService.findCommentsByStudent(id);
    }

    @PostMapping
    @PostAuthorize("hasAnyRole(faculty, admin)")
    public Comment save( @RequestBody Comment comment) {
        return commentService.save(comment);
    }

    @PutMapping("/{id}")
    @PostAuthorize("hasAnyRole(faculty, admin)")
    public Comment update(@PathVariable Long id, @RequestBody Comment comment) {
        comment.setId(id);
        return commentService.update(comment);
    }

    @DeleteMapping("/{id}")
    @PostAuthorize("hasAnyRole(faculty, admin)")
    public void update(@PathVariable Long id) {
        commentService.delete(id);
    }
}
