<template>
  <div class="error-wrapper">
    <div class="container-floud">
      <div class="col-xs-12 ground-color text-center">
        <div class="container-error-wrapper-404">
          <div class="clip">
            <div class="shadow">
              <span class="digit thirdDigit">4</span>
            </div>
          </div>
          <div class="clip">
            <div class="shadow">
              <span class="digit secondDigit">0</span>
            </div>
          </div>
          <div class="clip">
            <div class="shadow">
              <span class="digit firstDigit">4</span>
            </div>
          </div>
          <div class="msg">
            OH!
            <span class="triangle"></span>
          </div>
        </div>
        <h2 class="h1">Oop! Something wrong</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.error-wrapper{
  margin-bottom: 110px;
}

.error-wrapper .clip .shadow {
  height: 180px; /*Contrall*/
}
.error-wrapper .clip:nth-of-type(2) .shadow {
  width: 130px; /*Contrall play with javascript*/
}
.error-wrapper .clip:nth-of-type(1) .shadow,
.error-wrapper .clip:nth-of-type(3) .shadow {
  width: 250px; /*Contrall*/
}
.error-wrapper .digit {
  width: 150px; /*Contrall*/
  height: 150px; /*Contrall*/
  line-height: 150px; /*Contrall*/
  font-size: 120px;
  font-weight: bold;
}
.error-wrapper h2   /*Contrall*/
 {
  font-size: 32px;
}
.error-wrapper .msg /*Contrall*/
 {
  top: -190px;
  width: 80px;
  height: 80px;
  line-height: 80px;
  font-size: 32px;
}
.error-wrapper span.triangle    /*Contrall*/
 {
  top: 70%;
  right: 0%;
  border-left: 20px solid #535353;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
}

.error-wrapper .container-error-wrapper-404 {
  position: relative;
  height: 200px;
}
.error-wrapper .container-error-wrapper-404 .clip {
  display: inline-block;
  transform: skew(-45deg);
}
.error-wrapper .clip .shadow {
  overflow: hidden;
}
.error-wrapper .clip:nth-of-type(2) .shadow {
  overflow: hidden;
  position: relative;
  box-shadow: inset 20px 0px 20px -15px rgba(150, 150, 150, 0.8),
    20px 0px 20px -15px rgba(150, 150, 150, 0.8);
}

.error-wrapper .clip:nth-of-type(3) .shadow:after,
.error-wrapper .clip:nth-of-type(1) .shadow:after {
  content: "";
  position: absolute;
  right: -8px;
  bottom: 0px;
  height: 100%;
  width: 10px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(173, 173, 173, 0.8),
    transparent
  );
  border-radius: 50%;
}
.error-wrapper .clip:nth-of-type(3) .shadow:after {
  left: -8px;
}
.error-wrapper .digit {
  position: relative;
  top: 8%;
  color: white;
  background: #07b3f9;
  border-radius: 50%;
  display: inline-block;
  transform: skew(45deg);
}
.error-wrapper .clip:nth-of-type(2) .digit {
  left: -10%;
}
.error-wrapper .clip:nth-of-type(1) .digit {
  right: -20%;
}
.error-wrapper .clip:nth-of-type(3) .digit {
  left: -22%;
}
.error-wrapper h2 {
  color: #a2a2a2;
  font-weight: bold;
  padding-bottom: 20px;
}
.error-wrapper .msg {
  position: relative;
  display: block;
  background: #535353;
  color: #a2a2a2;
  border-radius: 50%;
  font-style: italic;
}
.error-wrapper .triangle {
  position: absolute;
  transform: rotate(45deg);
  content: "";
  width: 0;
  height: 0;
}

/* error-wrapper Page */
@media (max-width: 767px) {
  /* error-wrapper Page */
  .error-wrapper .clip .shadow {
    height: 100px; /*Contrall*/
  }
  .error-wrapper .clip:nth-of-type(2) .shadow {
    width: 80px; /*Contrall play with javascript*/
  }
  .error-wrapper .clip:nth-of-type(1) .shadow,
  .error-wrapper .clip:nth-of-type(3) .shadow {
    width: 100px; /*Contrall*/
  }
  .error-wrapper .digit {
    width: 80px; /*Contrall*/
    height: 80px; /*Contrall*/
    line-height: 80px; /*Contrall*/
    font-size: 52px;
  }
  .error-wrapper h2   /*Contrall*/
 {
    font-size: 24px;
  }
  .error-wrapper .msg /*Contrall*/
 {
    top: -110px;
    left: -5%;
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
  }
  .error-wrapper span.triangle    /*Contrall*/
 {
    top: 70%;
    right: -3%;
    border-left: 10px solid #535353;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
  }
  .error-wrapper .container-error-wrapper-404 {
    height: 110px;
  }
  /* error-wrapper Page */
}
</style>