package com.benkyo.restcontroller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.benkyo.entity.gen.Attendances;
import com.benkyo.model.dto.Attendance;
import com.benkyo.model.dto.request.DeleteAttendanceRequest;
import com.benkyo.model.dto.request.GetAttendanceListRequest;
import com.benkyo.model.dto.request.GetAttendanceRequest;
import com.benkyo.model.dto.request.UpsertAttendanceRequest;
import com.benkyo.service.AttendancesService;
import lombok.extern.slf4j.Slf4j;

@RequestMapping("/api/attendances")
@RestController
@Slf4j
public class AttendancesController {
    private AttendancesService attendancesService;
    // Attendances attendances = new Attendances();
    // メソッド内で定義したほうがいい。
    // 1.スレッドセーフ性考えると、メソッド内でインスタンス化したほうがいいかも。APIが同時に叩かれた時に、同じインスタンス使われるとバグる可能性ありそう。
    // 2.クラスで定義すると逆にメモリ食うかも。Controllerライフサイクルでは常にメモリ占有するけど、メソッド内で定義したら、メソッド終了時に解放される気がする。常にメモリ占有するか、呼ばれる時に確保して解放するかみたいな。

    public AttendancesController(AttendancesService attendancesService) {
        // serviceはDIコンテナに登録されているので、DIコンテナからコンストラクタで注入できる。
        this.attendancesService = attendancesService;
    }

    @GetMapping("/get")
    public ResponseEntity<Attendance> getAttendance(@RequestBody GetAttendanceRequest request) {
        Integer id = Integer.parseInt(
                (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        Attendances attendances = new Attendances();
        // userIdはsessionから取得
        attendances.setUserId(id);
        attendances.setYear(request.getYear());
        attendances.setMonth(request.getMonth());
        attendances.setDay(request.getDay());

        try {
            return ResponseEntity.ok().body(attendancesService.getAttendance(attendances));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/getAttendanceListByYearAndMonth")
    public ResponseEntity<List<Attendances>> getAttendanceListByYearAndMonth(
            @RequestBody GetAttendanceListRequest request) {
        Integer id = Integer.parseInt(
                (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        Attendances attendances = new Attendances();
        attendances.setUserId(id);
        attendances.setYear(request.getYear());
        attendances.setMonth(request.getMonth());

        try {
            return ResponseEntity.ok()
                    .body(attendancesService.getAttendanceListByYearAndMonth(attendances));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/insert")
    public ResponseEntity<Integer> insertAttendance(@RequestBody UpsertAttendanceRequest request) {
        Integer id = Integer.parseInt(
                (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        Attendances attendances = new Attendances();
        attendances.setUserId(id);
        attendances.setYear(request.getYear());
        attendances.setMonth(request.getMonth());
        attendances.setDay(request.getDay());
        attendances.setStartTime(request.getStartTime());
        attendances.setEndTime(request.getEndTime());

        try {
            int isPosted = attendancesService.insertAttendance(attendances);

            if (isPosted == 0) {
                System.err.println("attendanceは存在してませんでしたが、insertできませんでした");
            }
            return ResponseEntity.ok().body(isPosted);
        } catch (Exception e) {
            log.error("###### sql失敗.エラー: " + e.getMessage());
            return ResponseEntity.badRequest().body(0);
        }
    }

    // TODO updateも削除対象のattendanceがあるかチェックして、あった場合はerror投げるようにしたけどいらない？
    @PutMapping("/update")
    public ResponseEntity<Integer> updateAttendance(@RequestBody UpsertAttendanceRequest request) {
        Integer id = Integer.parseInt(
                (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        Attendances attendances = new Attendances();
        attendances.setUserId(id);
        attendances.setYear(request.getYear());
        attendances.setMonth(request.getMonth());
        attendances.setDay(request.getDay());
        attendances.setStartTime(request.getStartTime());
        attendances.setEndTime(request.getEndTime());

        try {
            int isUpdated = attendancesService.updateAttendance(attendances);

            if (isUpdated == 0) {
                System.err.println("attendanceは存在してませんでしたが、insertできませんでした");
            }
            return ResponseEntity.ok().body(isUpdated);
        } catch (Exception e) {
            log.error("###### sql失敗.エラー: " + e.getMessage());
            return ResponseEntity.badRequest().body(0);
        }
    }

    // TODO deleteも削除対象のattendanceがあるかチェックして、あった場合はerror投げるようにしたけどいらない？
    @DeleteMapping("/delete")
    public ResponseEntity<Integer> deleteAttendance(@RequestBody DeleteAttendanceRequest request) {
        Integer id = Integer.parseInt(
                (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        Attendances attendances = new Attendances();
        attendances.setUserId(id);
        attendances.setYear(request.getYear());
        attendances.setMonth(request.getMonth());
        attendances.setDay(request.getDay());

        try {
            int isDeleted = attendancesService.deleteAttendance(attendances);

            if (isDeleted == 0) {
                System.err.println("attendanceは存在していましたが、deleteできませんでした");
            }
            return ResponseEntity.ok().body(isDeleted);
        } catch (Exception e) {
            log.error("###### sql失敗.エラー: " + e.getMessage());
            return ResponseEntity.badRequest().body(0);
        }
    }
}
