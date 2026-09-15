package com.campusnav.service;

import com.campusnav.model.CampusClosure;
import com.campusnav.repository.CampusClosureRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ClosureService {
    private final CampusClosureRepository closureRepository;

    public ClosureService(CampusClosureRepository closureRepository) {
        this.closureRepository = closureRepository;
    }

    public List<CampusClosure> getActiveClosures() {
        return closureRepository.findByIsActiveTrue();
    }

    public CampusClosure create(CampusClosure closure) {
        return closureRepository.save(closure);
    }

    public void deactivate(String id) {
        closureRepository.findById(id).ifPresent(c -> {
            c.setIsActive(false);
            closureRepository.save(c);
        });
    }

    public Set<String> getClosedEdgeIds() {
        return getActiveClosures().stream()
                .filter(c -> c.getEdgeId() != null)
                .map(CampusClosure::getEdgeId)
                .collect(Collectors.toSet());
    }
}
