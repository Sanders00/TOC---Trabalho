package br.edu.utfpr.todo.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import br.edu.utfpr.todo.dto.Message;
import br.edu.utfpr.todo.dto.SensorDTO;
import br.edu.utfpr.todo.model.Sensor;
import br.edu.utfpr.todo.service.SensorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/sensor")
@CrossOrigin(origins = "*")
@Tag(name = "Sensor", description = "Sensor resource endpoints")
public class SensorController {

    @Autowired
    private SensorService sensorService;

    @Operation(summary = "Register a Sensor in the database", description = "Register a Sensor object in the database. For registration fill all Reading object information with name, location, type, status and instalation date", tags = {
        "Sensor" })
        @ApiResponses({
            @ApiResponse(responseCode = "200", content = {
                    @Content(schema = @Schema(implementation = Sensor.class), mediaType = "application/json") }),   
            @ApiResponse(responseCode = "404", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500")
    })
    @PostMapping
    public ResponseEntity<Object> create(@RequestBody SensorDTO sensorDTO) {
        var sensor = new Sensor();
        BeanUtils.copyProperties(sensorDTO, sensor);

        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(sensorService.save(sensor));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Message.b(e.getMessage()));
        }
    }

    @Operation(summary = "Retrieve all Sensors in the database", description = "Get all Sensors objects in the database. The response is all Sensors object with name, location, type, status and instalation date.", tags = {
        "Sensor" })
        @ApiResponses({
            @ApiResponse(responseCode = "200", content = {
                    @Content(schema = @Schema(implementation = Sensor.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "401"),      
            @ApiResponse(responseCode = "404", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500")
    })
    @SecurityRequirement(name = "Authorization")
    @GetMapping
    public ResponseEntity<Page<Sensor>> getAll(
            @PageableDefault(page = 0, size = 10, sort = "name", direction = Sort.Direction.ASC) Pageable pageable) {
        return ResponseEntity.ok().body(sensorService.findAll(pageable));
    }

    @Operation(summary = "Retrieve a Sensor by Id", description = "Get a Sensor object by specifying its id. The response is a Sensor object with name, location, type, status and instalation date", tags = {"Sensor"})
    @ApiResponses({
        @ApiResponse(responseCode = "200", content = {
                @Content(schema = @Schema(implementation = Sensor.class), mediaType = "application/json") }),
        @ApiResponse(responseCode = "401"),      
        @ApiResponse(responseCode = "404", content = { @Content(schema = @Schema()) }),
        @ApiResponse(responseCode = "500")
    })
    @SecurityRequirement(name = "Authorization")
    @GetMapping("/{id}")
    public ResponseEntity<Object> getById(@PathVariable UUID id) {
        Optional<Sensor> sensor = this.sensorService.findById(id);
        return sensor.isPresent() ? ResponseEntity.ok(sensor.get()) : ResponseEntity.notFound().build();
    }

    @Operation(summary = "Delete a Sensor by Id", description = "Delete a Sensor object by specifying its id.", tags = {
        "Sensor" })
    @ApiResponses({
        @ApiResponse(responseCode = "200", content = {
                @Content(schema = @Schema(implementation = Sensor.class), mediaType = "application/json") }),
        @ApiResponse(responseCode = "401"),      
        @ApiResponse(responseCode = "404", content = { @Content(schema = @Schema()) }),
        @ApiResponse(responseCode = "500")
    })
    @SecurityRequirement(name = "Authorization")
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable UUID id) {
        Optional<Sensor> sensor = sensorService.findById(id);
        if (sensor.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        sensorService.delete(sensor.get());
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Update a Sensor by Id", description = "Update a Sensor object by specifying its id. The response is Reading object with the updated name, location, type, status and instalation date", tags = {
        "Sensor" })
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = {
                @Content(schema = @Schema(implementation = Sensor.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "401"),      
            @ApiResponse(responseCode = "404", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500")
    })
    @SecurityRequirement(name = "Authorization")
    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable UUID id, @RequestBody SensorDTO sensorDTO) {
        Optional<Sensor> sensor = sensorService.findById(id);
        if (sensor.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        var sensorToUpdate = new Sensor();
        BeanUtils.copyProperties(sensorDTO, sensorToUpdate);
        sensorToUpdate.setId(sensor.get().getId());
        return ResponseEntity.ok().body(sensorService.save(sensorToUpdate));
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }
}
