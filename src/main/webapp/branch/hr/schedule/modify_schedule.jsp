<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>일정 수정</title>
  <style>
    * {
      box-sizing: border-box;
    }

    html, body {
      margin: 0;
      padding: 0;
      font-family: "Malgun Gothic", sans-serif;
      background: transparent;
      color: #111827;
    }

    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }

    .modal-wrap {
      width: 100%;
      max-width: 660px;
      margin: 0 auto;
    }

    .modal-card {
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 14px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.18);
      overflow: hidden;
    }

    .modal-header {
      height: 52px;
      padding: 0 18px;
      border-bottom: 1px solid #e5e7eb;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .modal-title {
      margin: 0;
      font-size: 16px;
      font-weight: 700;
      color: #111827;
    }

    .close-btn {
      border: 0;
      background: transparent;
      color: #9ca3af;
      font-size: 22px;
      line-height: 1;
      cursor: pointer;
      padding: 0;
      width: 28px;
      height: 28px;
    }

    .close-btn:hover {
      color: #4b5563;
    }

    .modal-body {
      padding: 18px;
      background: #ffffff;
    }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 12px;
    }

    .field label {
      display: block;
      margin-bottom: 6px;
      font-size: 12px;
      font-weight: 600;
      color: #4b5563;
    }

    .input,
    .textarea,
    .select {
      width: 100%;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      background: #f9fafb;
      padding: 10px 12px;
      font-size: 13px;
      color: #111827;
      outline: none;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .input,
    .select {
      height: 34px;
    }

    .textarea {
      min-height: 92px;
      resize: none;
      padding-top: 10px;
    }

    .input:focus,
    .textarea:focus,
    .select:focus {
      border-color: #22c55e;
      box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.12);
      background: #ffffff;
    }

    .readonly {
      background: #f3f4f6;
      color: #6b7280;
    }

    .time-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }

    .modal-footer {
      padding: 10px 18px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      background: #ffffff;
    }

    .left-actions,
    .right-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .btn {
      min-width: 54px;
      height: 32px;
      padding: 0 14px;
      border: 1px solid transparent;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
    }

    .btn-delete {
      background: #ef4444;
      color: #ffffff;
    }

    .btn-delete:hover {
      background: #dc2626;
    }

    .btn-cancel {
      background: #ffffff;
      color: #4b5563;
      border-color: #d1d5db;
    }

    .btn-cancel:hover {
      background: #f9fafb;
    }

    .btn-save {
      background: #16a34a;
      color: #ffffff;
    }

    .btn-save:hover {
      background: #15803d;
    }

    .btn-icon {
      margin-right: 5px;
      font-size: 12px;
      line-height: 1;
    }

    @media (max-width: 640px) {
      body {
        padding: 12px;
      }

      .modal-card {
        border-radius: 12px;
      }

      .modal-body,
      .modal-footer {
        padding-left: 14px;
        padding-right: 14px;
      }

      .time-row {
        grid-template-columns: 1fr;
      }

      .modal-footer {
        flex-direction: column;
        align-items: stretch;
      }

      .left-actions,
      .right-actions {
        width: 100%;
        justify-content: space-between;
      }

      .right-actions {
        justify-content: flex-end;
      }
    }
  </style>
</head>
<body>
  <div class="modal-wrap">
    <div class="modal-card">
      <div class="modal-header">
        <h2 class="modal-title">일정 수정</h2>
        <button type="button" class="close-btn" onclick="closeModal()">×</button>
      </div>

      <form action="<%= request.getContextPath() %>/hr/schedule/update" method="post">
        <div class="modal-body">
          <!-- 수정 대상 PK -->
          <input type="hidden" name="schedule_id" value="${schedule.schedule_id}">

          <div class="form-grid">
            <div class="field">
              <label for="employeeName">직원</label>
              <input
                type="text"
                id="employeeName"
                name="employee_name"
                class="input readonly"
                value="${schedule.employee_name}"
                readonly
              />
            </div>

            <div class="field">
              <label for="scheduleType">일정 유형</label>
              <select id="scheduleType" name="schedule_type" class="select">
                <option value="">선택하세요</option>
                <option value="근무" ${schedule.schedule_type == '근무' ? 'selected' : ''}>근무</option>
                <option value="회의" ${schedule.schedule_type == '회의' ? 'selected' : ''}>회의</option>
                <option value="교육" ${schedule.schedule_type == '교육' ? 'selected' : ''}>교육</option>
                <option value="휴가" ${schedule.schedule_type == '휴가' ? 'selected' : ''}>휴가</option>
                <option value="출장" ${schedule.schedule_type == '출장' ? 'selected' : ''}>출장</option>
              </select>
            </div>

            <div class="field">
              <label for="title">일정 제목</label>
              <input
                type="text"
                id="title"
                name="title"
                class="input"
                value="${schedule.title}"
                placeholder="일정 제목을 입력하세요"
              />
            </div>

            <div class="field">
              <label for="workDate">날짜</label>
              <input
                type="text"
                id="workDate"
                name="work_date_text"
                class="input readonly"
                value="${schedule.work_date_text}"
                readonly
              />
              <!-- 실제 전송용 -->
              <input type="hidden" name="work_date" value="${schedule.work_date}">
            </div>

            <div class="time-row">
              <div class="field">
                <label for="startTime">시작 시간</label>
                <input
                  type="time"
                  id="startTime"
                  name="start_time"
                  class="input"
                  value="${schedule.start_time}"
                />
              </div>

              <div class="field">
                <label for="endTime">종료 시간</label>
                <input
                  type="time"
                  id="endTime"
                  name="end_time"
                  class="input"
                  value="${schedule.end_time}"
                />
              </div>
            </div>

            <div class="field">
              <label for="location">장소</label>
              <input
                type="text"
                id="location"
                name="location"
                class="input"
                value="${schedule.location}"
                placeholder="장소를 입력하세요"
              />
            </div>

            <div class="field">
              <label for="memo">메모</label>
              <textarea
                id="memo"
                name="memo"
                class="textarea"
                placeholder="메모를 입력하세요"
              >${schedule.memo}</textarea>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <div class="left-actions">
            <button type="button" class="btn btn-delete" onclick="deleteSchedule()">
              <span class="btn-icon">🗑</span>삭제
            </button>
          </div>

          <div class="right-actions">
            <button type="button" class="btn btn-cancel" onclick="closeModal()">취소</button>
            <button type="submit" class="btn btn-save">저장</button>
          </div>
        </div>
      </form>
    </div>
  </div>

  <script>
    function closeModal() {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({ type: "close-hr-modal" }, "*");
      } else {
        window.close();
      }
    }

    function deleteSchedule() {
      if (!confirm("이 일정을 삭제하시겠습니까?")) return;

      var form = document.createElement("form");
      form.method = "post";
      form.action = "<%= request.getContextPath() %>/hr/schedule/delete";

      var input = document.createElement("input");
      input.type = "hidden";
      input.name = "schedule_id";
      input.value = "${schedule.schedule_id}";

      form.appendChild(input);
      document.body.appendChild(form);
      form.submit();
    }
  </script>
</body>
</html>