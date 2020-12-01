<!--
* description: 模板-表单
* author: zhongchh
* createdDate: 2019-10-06
* logs:
-->
<template>
  <section class="filter-params-e3s">
    <el-form :model="fieldsData" ref="ruleForm" class="mixRuleForm" :inline-message="true" v-show="isShow">
      <el-row>
        <el-col :span="24" style="margin-bottom: 0">
          <template v-for="(item, index) in fields">
            <!-- 下拉框-->
            <el-col v-if="item.type === 'dropdownList'" v-show="item.isShow === false ? false : true" :key="`fields_${index}`" :span="item.span || 6">
              <el-form-item :prop="item.codeField" :rules="item.rules" :label-width="item.labelWidth">
                <span slot="label" @mouseenter="showLabel(item)" @mouseleave="hideLabel(item)">{{ item.label }}</span>
                <el-select :class="item.valFont?'font-Weight-red':''" v-if="item.type === 'dropdownList'" :disabled="item.disabled||false" v-model="fieldsData[item.codeField]" @change="doChildEvent(item.change)" @focus="doChildEvent(item.focus)" :ref="item.codeField" :popper-class="item.popClass" :filterable="item.filterable || false" :multiple="item.multiple || false" :placeholder="item.placeholder||'请选择'" :clearable="item.clearable == false ? false : true" collapse-tags size="small">
                  <el-option v-for="(obj, i) in item.options" :key="`${item.codeField}_${i}`" :label="obj.label || obj[item.newLabel]" :value="obj.value || obj[item.newValue]"></el-option>
                </el-select>
              </el-form-item>
              <span
                class="ellipsisshowName"
                v-show="item.showLabel"
              >{{ item.label }}<i></i></span>
            </el-col>
            <el-col v-else-if="item.type === 'inputSearch'" :span="item.span || 6" :key="`fields_${index}`">
              <el-form-item :prop="item.codeField" :rules="item.rules" :label-width="item.labelWidth">
                <span slot="label" @mouseenter="showLabel(item)" @mouseleave="hideLabel(item)">{{ item.label }}</span>
                <el-autocomplete v-model="fieldsData[item.codeField]" :fetch-suggestions="item.querySearch" :ref="item.codeField" :disabled="item.disabled || false" :readonly="item.readonly || false" placeholder="请输入内容" :class="['el-input-autocomplete', item.fieldClass]" @select="doChildEvent(item.select)"></el-autocomplete>
              </el-form-item>
              <span
                class="ellipsisshowName"
                v-show="item.showLabel"
              >{{ item.label }}<i></i></span>
            </el-col>
            <!-- 文本输入框-->
            <el-col v-else-if="item.type === 'inputTxt'" v-show="item.isShow === false ? false : true" :key="`fields_${index}`" :span="item.span || 6" label-width="100px">
              <el-form-item :prop="item.codeField" :rules="item.rules" :label-width="item.labelWidth">
                <span slot="label" @mouseenter="showLabel(item)" @mouseleave="hideLabel(item)">{{ item.label }}</span>
                <el-input :class="item.valFont?'font-Weight-red':''" v-model="fieldsData[item.codeField]" @focus="doChildEvent(item.focus)" @change="doChildEvent(item.change)" @blur="doChildEvent(item.blur)" @clear="doChildEvent(item.clear)" :readonly="item.readonly || false" :ref="item.codeField" :minlength="item.minlength"  :maxlength="item.maxlength" :suffix-icon="item.suffixIcon || 'suffixIcon'" :placeholder="item.placeholder||'请输入'" size="small" :clearable="item.clearable == false ? false : true" :disabled="item.disabled||false"></el-input>
              </el-form-item>
              <span
                class="ellipsisshowName"
                v-show="item.showLabel"
              >{{ item.label }}<i></i></span>
            </el-col>
             <!-- 纯输入框-->
            <el-col v-else-if="item.type === 'inputTxt2'" v-show="item.isShow === false ? false : true" :key="`fields_${index}`" :span="item.span || 6" >
              <el-form-item :prop="item.codeField" :rules="item.rules" :label-width="item.labelWidth">
                <el-input v-model="fieldsData[item.codeField]" @focus="doChildEvent(item.focus)" @change="doChildEvent(item.change)" @blur="doChildEvent(item.blur)" :ref="item.codeField" :readonly="item.readonly || false" :minlength="item.minlength"  :maxlength="item.maxlength" :suffix-icon="item.suffixIcon || 'suffixIcon'" :placeholder="item.placeholder||'请输入'" size="small" :clearable="item.clearable == false ? false : true" :disabled="item.disabled||false"></el-input>
              </el-form-item>
              <span
                class="ellipsisshowName"
                v-show="item.showLabel"
              >{{ item.label }}<i></i></span>
            </el-col>
            <!-- 带按钮的文本输入框-->
            <el-col v-else-if="item.type === 'inputWithBtn'" v-show="item.isShow === false ? false : true" :key="`fields_${index}`" :span="item.span || 6">
              <el-form-item :prop="item.codeField" :rules="item.rules" :label-width="item.labelWidth">
                <span slot="label" @mouseenter="showLabel(item)" @mouseleave="hideLabel(item)">{{ item.label }}</span>
                <el-input v-model="fieldsData[item.codeField]" @focus="doChildEvent(item.focus)" @change="doChildEvent(item.change)" @blur="doChildEvent(item.blur)" :ref="item.codeField" class="btnSuffix" :readonly="item.readonly || false"
                :disabled="item.disabled || false"  :placeholder="item.placeholder||'请选择'" size="small" :clearable="item.clearable == false ? false : true">
                <i slot="suffix" @click="doChildEvent(item.btnClick)" class="mix-icon el-icon-search"></i>
                </el-input>
              </el-form-item>
              <span
                class="ellipsisshowName"
                v-show="item.showLabel"
              >{{ item.label }}<i></i></span>
            </el-col>
            <!-- 带刷新按钮的文本输入框-->
            <el-col v-else-if="item.type === 'inputWithResetBtn'" v-show="item.isShow === false ? false : true" :key="`fields_${index}`" :span="item.span || 6">
              <el-form-item :prop="item.codeField" :rules="item.rules" :label-width="item.labelWidth">
                <span slot="label" @mouseenter="showLabel(item)" @mouseleave="hideLabel(item)">{{ item.label }}</span>
                <el-input v-model="fieldsData[item.codeField]" @focus="doChildEvent(item.focus)" @change="doChildEvent(item.change)" @blur="doChildEvent(item.blur)" :ref="item.codeField" :readonly="item.readonly || false" class="btnSuffix" :placeholder="item.placeholder||'请选择'" size="small" :clearable="item.clearable == false ? false : true">
                 <i slot="suffix" @click="doChildEvent(item.btnClick)" class="mix-icon el-icon-refresh"></i>
                </el-input>
              </el-form-item>
              <span
                class="ellipsisshowName"
                v-show="item.showLabel"
              >{{ item.label }}<i></i></span>
            </el-col>
            <!-- 文本area输入框-->
            <el-col v-else-if="item.type === 'inputTxtArea'" v-show="item.isShow === false ? false : true" :key="`fields_${index}`" :span="item.span || 6">
              <el-form-item :prop="item.codeField" :rules="item.rules" :label-width="item.labelWidth">
                <span slot="label" @mouseenter="showLabel(item)" @mouseleave="hideLabel(item)">{{ item.label }}</span>
                <el-input type="textarea" v-model="fieldsData[item.codeField]" :rows="item.rows || 1" :readonly="item.readonly || false" :placeholder="item.placeholder||'请输入'" :ref="item.codeField" :minlength="item.minlength"  :maxlength="item.maxlength"    size="small"  :disabled="item.disabled||false"></el-input>
              </el-form-item>
              <span
                class="ellipsisshowName"
                v-show="item.showLabel"
              >{{ item.label }}<i></i></span>
            </el-col>
            <!-- 数字输入框-->
            <el-col v-else-if="item.type === 'inputNumber'" :key="`fields_${index}`" :span="item.span || 6">
              <el-form-item :prop="item.codeField" v-show="item.isShow === false ? false : true" :rules="item.rules" :label-width="item.labelWidth">
                <span slot="label" @mouseenter="showLabel(item)" @mouseleave="hideLabel(item)">{{ item.label }}</span>
                <el-input type="number" v-model="fieldsData[item.codeField]" @focus="doChildEvent(item.focus)" @change="doChildEvent(item.change)" @blur="doChildEvent(item.blur)" :ref="item.codeField" :readonly="item.readonly || false" :placeholder="item.placeholder||'请输入'" size="small" :disabled="item.disabled || false"  :min="item.min || 1" :max="1000000000" :step="item.step || 1" :clearable="item.clearable == false ? false : true"></el-input>
              </el-form-item>
              <span
                class="ellipsisshowName"
                v-show="item.showLabel"
              >{{ item.label }}<i></i></span>
            </el-col>
            <!-- 时间输入框-->
            <el-col v-else-if="item.type === 'inputDate'" :key="`fields_${index}`" :span="item.span || 6" v-show="item.isShow === false ? false : true">
              <el-form-item v-show="item.isShow === false ? false : true" :prop="item.codeField" :rules="item.rules" :class="item.class" :label-width="item.labelWidth">
                <span slot="label" @mouseenter="showLabel(item)" @mouseleave="hideLabel(item)">{{ item.label }}</span>
                <el-date-picker v-if="item.dateType !== 'daterange'" v-model="fieldsData[item.codeField]" :type="item.dateType"
                 @change="doChildEvent(item.change)" :ref="item.codeField" :readonly="item.readonly || false" :placeholder="item.placeholder||'选择日期'"
                 :disabled="item.disabled || false" :pickerOptions="item.pickerOptions" unlink-panels  :clearable="item.clearable ? true: false" :value-format="item.valueFormat || 'yyyy-MM-dd HH:mm:ss'"></el-date-picker>
                 <mixDateRangePicker v-else :datas="fieldsData[item.codeField]" @change="doChildEvent(item.change)" :ref="item.codeField" :readonly="item.readonly" :disabled='item.disabled||false' :clearable="item.clearable == false ? false : true"/>
              </el-form-item>
              <span
                class="ellipsisshowName"
                v-show="item.showLabel"
              >{{ item.label }}<i></i></span>
            </el-col>
            <!-- 多选输入框-->
            <el-col v-else-if="item.type === 'checkbox'" v-show="item.isShow === false ? false : true" :key="`fields_${index}`" :span="item.span || 2" :class="item.class">
              <el-form-item :prop="item.codeField" :rules="item.rules" class="u-checkbox">
                <el-checkbox true-label="1" false-label="0" :disabled="item.disabled || false" v-model="fieldsData[item.codeField]" @change="doChildEvent(item.change)" :ref="item.codeField">{{item.label}}</el-checkbox>
              </el-form-item>
            </el-col>
            <!--单选按钮-->
            <el-col v-else-if="item.type === 'radio'" :key="`fields_${index}`" :span="item.span || 2" :class="item.class">
              <el-form-item :prop="item.codeField" :rules="item.rules">
                <span slot="label" @mouseenter="showLabel(item)" @mouseleave="hideLabel(item)">{{ item.label }}</span>
                <!--<el-radio-group v-model="fieldsData[item.codeField]">
                  <el-radio v-for="(op, i) in item.comps" :label="op.value" :disabled="op.disabled || false">{{op.label}}</el-radio>
                </el-radio-group>-->
                <el-radio v-for="(op, i) in item.comps" :key="`${op.codeField}_${i}`" v-model="fieldsData[op.codeField]" :label="op.value" :ref="item.codeField" :disabled="op.disabled || false">{{op.label}}</el-radio>
              </el-form-item>
              <span
                class="ellipsisshowName"
                v-show="item.showLabel"
              >{{ item.label }}<i></i></span>
            </el-col>
            <!-- 纯文字备注-->
            <el-col v-else-if="item.type === 'text'" :key="`fields_${index}`" :span="item.span || 2" :class="item.class">
              <el-form-item :prop="item.codeField" :rules="item.rules">
                <span true-label="1" false-label="0" :disabled="item.disabled || false" @change="doChildEvent(item.change)" :ref="item.codeField">{{item.label}}</span>
              </el-form-item>
            </el-col>
            <!-- 外部自定义组件-->
            <el-col v-else-if="item.isComponent" :class="item.class" v-show="item.isShow === false ? false : true" :key="`fields_${index}`" :span="item.span || 6">
              <el-form-item :prop="item.codeField" :rules="item.rules" >
                <component :unListQuryFields="item.unListQuryFields" :key="item.compKey" :ref="item.isRequire ? item.isRequire+ item.compKey : item.compKey" :is="item.component" :params="item.params" :isShow="item.isShow || true" :codeField="item.codeField" :code="fieldsData[item.codeField]" :text="fieldsData[item.codeField]" @sendCode="item.sendCode" :textField="fieldsData[item.codeField]" @changeCode="item.changeCode" @focusCode="item.focusCode" :isMul="item.isMul" :isRequire="item.isRequire" :span="24" :labelName="item.label" :options="item.options"
                :lookuptype="item.lookuptype"  :isHost="item.isHost" :inputType="item.inputType" :popupsKey="item.compKey" :dateOptionsType="item.dateOptionsType" :format="item.format" :dateType="item.dateType" :valueObject="item.curValueObject" :clearable="item.clearable == false ? false : true" :placeholder="item.placeholder||'请选择'"  :filterable="item.filterable" :parentFileds="item.parentFileds || ''" :returnCodeField="item.returnCodeField" :returnTextField="item.returnTextField" :validrule="item.validrule" :queryParams="item.queryParams" :disabled="item.disabled"
                :popper-class="item.popperClass" :dataToObject="item.dataToObject" :labelWidth="item.labelWidth" :labelMaxCount="item.labelMaxCount"></component>
              </el-form-item>
              <span
                class="ellipsisshowName"
                v-show="item.showLabel"
              >{{ item.label }}<i></i></span>
            </el-col>
            <el-col v-else :span="item.span || 6" :style="item.class" :key="`fields_fields_${index}`" class="heightFix"></el-col>
          </template>
        </el-col>
        <el-col v-if="isSearch" :span="24" v-show="toggleParam">
          <template v-for="(item, index) in fieldsMore">
            <el-col v-if="item.type === 'dropdownList'" :span="item.span || 6" :key="`fieldsMore_${index}`">
              <el-form-item :prop="item.codeField" :rules="item.rules" :label-width="item.labelWidth">
                <span slot="label" @mouseenter="showLabel(item)" @mouseleave="hideLabel(item)">{{ item.label }}</span>
                <el-select v-if="item.type === 'dropdownList'" :disabled="item.disabled||false" v-model="fieldsData[item.codeField]" @change="doChildEvent(item.event)" @focus="doChildEvent(item.focus)" :ref="item.codeField" :popper-class="item.popClass" :filterable="item.filterable || false" :multiple="item.multiple || false" :placeholder="item.placeholder||'请选择'" :clearable="item.clearable||item.clearable===false?false:true" collapse-tags size="small">
                  <el-option v-for="(obj, i) in item.options" :key="`${item.codeField}_${i}`" :label="obj.label || obj[item.newLabel]" :value="obj.value || obj[item.newValue]"></el-option>
                </el-select>
              </el-form-item>
              <span
                class="ellipsisshowName"
                v-show="item.showLabel"
              >{{ item.label }}<i></i></span>
            </el-col>
            <el-col v-else-if="item.type === 'inputSearch'" :span="item.span || 6" :key="`fieldsMore_${index}`">
              <el-form-item :prop="item.codeField" :rules="item.rules" :label-width="item.labelWidth">
                <span slot="label" @mouseenter="showLabel(item)" @mouseleave="hideLabel(item)">{{ item.label }}</span>
                <el-autocomplete v-model="fieldsData[item.codeField]" :fetch-suggestions="item.querySearch" :ref="item.codeField" :disabled="item.disabled||false" placeholder="请输入内容" class="el-input-autocomplete" @select="doChildEvent(item.select)"></el-autocomplete>
              </el-form-item>
              <span
                class="ellipsisshowName"
                v-show="item.showLabel"
              >{{ item.label }}<i></i></span>
            </el-col>
            <el-col v-else-if="item.type === 'inputTxt'" v-show="item.isShow === false ? false : true" :span="item.span || 6" :key="`fieldsMore_${index}`">
              <el-form-item :prop="item.codeField" :rules="item.rules" :label-width="item.labelWidth">
                <span slot="label" @mouseenter="showLabel(item)" @mouseleave="hideLabel(item)">{{ item.label }}</span>
                <el-input v-model="fieldsData[item.codeField]" @focus="doChildEvent(item.focus)" @change="doChildEvent(item.change)" @blur="doChildEvent(item.blur)" :ref="item.codeField" :readonly="item.readonly || false" :suffix-icon="item.suffixIcon || 'suffixIcon'" :placeholder="item.placeholder||'请输入'" size="small" clearable :disabled="item.disabled||false"></el-input>
              </el-form-item>
              <span
                class="ellipsisshowName"
                v-show="item.showLabel"
              >{{ item.label }}<i></i></span>
            </el-col>
              <el-col v-else-if="item.type === 'radio'" :span="item.span || 2" :class="item.class" :key="`fieldsMore_${index}`">
              <el-form-item :prop="item.codeField" :rules="item.rules" :label-width="item.labelWidth">
                <span slot="label" @mouseenter="showLabel(item)" @mouseleave="hideLabel(item)">{{ item.label }}</span>
                <!--<el-radio-group v-model="fieldsData[item.codeField]">
                  <el-radio v-for="(op, i) in item.comps" :label="op.value" :disabled="op.disabled || false">{{op.label}}</el-radio>
                </el-radio-group>-->
                <el-radio v-for="(op, i) in item.comps" :key="`${op.codeField}_${i}`" v-model="fieldsData[op.codeField]" :ref="item.codeField" :label="op.value" :disabled="op.disabled || false">{{op.label}}</el-radio>
              </el-form-item>
              <span
                class="ellipsisshowName"
                v-show="item.showLabel"
              >{{ item.label }}<i></i></span>
            </el-col>
            <!-- 带按钮的文本输入框-->
            <el-col v-else-if="item.type === 'inputWithBtn'" v-show="item.isShow === false ? false : true" :span="item.span || 6" :key="`fieldsMore_${index}`">
              <el-form-item :prop="item.codeField" :rules="item.rules" :label-width="item.labelWidth">
                <span slot="label" @mouseenter="showLabel(item)" @mouseleave="hideLabel(item)">{{ item.label }}</span>
                <el-input v-model="fieldsData[item.codeField]" @focus="doChildEvent(item.focus)" @change="doChildEvent(item.change)" @blur="doChildEvent(item.blur)" :ref="item.codeField" class="btnSuffix" :readonly="item.readonly || false" :disabled="item.disabled || false" :placeholder="item.placeholder||'请选择'" size="small" clearable>
                 <i slot="suffix" @click="doChildEvent(item.btnClick)" class="mix-icon el-icon-search"></i>
                </el-input>
              </el-form-item>
              <span
                class="ellipsisshowName"
                v-show="item.showLabel"
              >{{ item.label }}<i></i></span>
            </el-col>
            <el-col v-else-if="item.type === 'inputTxtArea'" :span="item.span || 6" :key="`fieldsMore_${index}`">
              <el-form-item :prop="item.codeField" :rules="item.rules" :label-width="item.labelWidth">
                <span slot="label" @mouseenter="showLabel(item)" @mouseleave="hideLabel(item)">{{ item.label }}</span>
                <el-input type="textarea" v-model="fieldsData[item.codeField]" :readonly="item.readonly || false" :rows="item.rows || 1" :ref="item.codeField" :placeholder="item.placeholder||'请输入'" size="small" :disabled="item.disabled||false"></el-input>
              </el-form-item>
              <span
                class="ellipsisshowName"
                v-show="item.showLabel"
              >{{ item.label }}<i></i></span>
            </el-col>
            <el-col v-else-if="item.type === 'inputNumber'" :span="item.span || 6" :key="`fieldsMore_${index}`">
              <el-form-item :prop="item.codeField" :rules="item.rules" :label-width="item.labelWidth">
                <span slot="label" @mouseenter="showLabel(item)" @mouseleave="hideLabel(item)">{{ item.label }}</span>
                <el-input type="number" v-model="fieldsData[item.codeField]" @focus="doChildEvent(item.focus)" @change="doChildEvent(item.change)" @blur="doChildEvent(item.blur)" :ref="item.codeField" :readonly="item.readonly || false" :placeholder="item.placeholder||'请输入'" size="small" :min="item.min || 1" ></el-input>
              </el-form-item>
              <span
                class="ellipsisshowName"
                v-show="item.showLabel"
              >{{ item.label }}<i></i></span>
            </el-col>
            <el-col v-else-if="item.type === 'inputDate'" :span="item.span || 6" :key="`fieldsMore_${index}`">
              <el-form-item :prop="item.codeField" :rules="item.rules" :label-width="item.labelWidth">
                <span slot="label" @mouseenter="showLabel(item)" @mouseleave="hideLabel(item)">{{ item.label }}</span>
                <el-date-picker v-if="item.dateType !== 'daterange'" v-model="fieldsData[item.codeField]" :clearable="item.clearable == false ? false : true" :value-format="item.valueFormat || 'yyyy-MM-dd HH:mm:ss'" :ref="item.codeField" :type="item.dateType" :readonly="item.readonly || false" :placeholder="item.placeholder||'选择日期'"  @change="doChildEvent(item.change)" :disabled="item.disabled || false" :pickerOptions="item.pickerOptions" unlink-panels></el-date-picker>
                <mixDateRangePicker v-else :datas="fieldsData[item.codeField]" @change="doChildEvent(item.change)" :ref="item.codeField" :readonly="item.readonly || false" :disabled='item.disabled||false' :clearable="item.clearable == false ? false : true"/>
              </el-form-item>
              <span
                class="ellipsisshowName"
                v-show="item.showLabel"
              >{{ item.label }}<i></i></span>
            </el-col>
            <el-col v-else-if="item.type === 'checkbox'" v-show="item.isShow === false ? false : true" :span="item.span || 2" :key="`fieldsMore_${index}`" :class="item.class">
              <el-form-item :prop="item.codeField" :rules="item.rules" class="u-checkbox">
                <el-checkbox true-label="1" false-label="0" v-model="fieldsData[item.codeField]" :disabled="item.disabled || false" @change="doChildEvent(item.change)" :ref="item.codeField" size="small">{{item.label}}</el-checkbox>
              </el-form-item>
            </el-col>
              <el-col v-else-if="item.type === 'text'" :span="item.span || 2" :key="`fieldsMore_${index}`">
              <el-form-item :prop="item.codeField" :rules="item.rules" :class="item.class">
                <span slot="label" @mouseenter="showLabel(item)" @mouseleave="hideLabel(item)">{{ item.label }}</span>
                <span true-label="1" false-label="0" :disabled="item.disabled || false" @change="doChildEvent(item.change)" :ref="item.codeField" size="small">{{item.label}}</span>
              </el-form-item>
              <span
                class="ellipsisshowName"
                v-show="item.showLabel"
              >{{ item.label }}<i></i></span>
            </el-col>
            <!-- 外部自定义组件-->
            <el-col v-else-if="item.isComponent" :span="item.span || 6" :class="item.class" v-show="item.isShow === false ? false : true"  :key="`fieldsMore_${index}`">
              <el-form-item :prop="item.codeField" :rules="item.rules">
              <component :unListQuryFields="item.unListQuryFields" :key="item.compKey" :ref="(item.isRequire ? item.isRequire + item.compKey : item.compKey)" :isHost="item.isHost" :is="item.component"
              :params="item.params" :isShow="item.isShow || true" :codeField="item.codeField" :code="fieldsData[item.codeField]" @sendCode="item.sendCode" @changeCode="item.changeCode"
              @focusCode="item.focusCode" :isMul="item.isMul" :isRequire="item.isRequire" :span="24" :labelName="item.label" :options="item.options" :lookuptype="item.lookuptype"
              :inputType="item.inputType" :placeholder="item.placeholder||'请选择'" :popupsKey="item.compKey" :dateOptionsType="item.dateOptionsType" :format="item.format" :dateType="item.dateType"
              :valueObject="item.curValueObject" :clearable="item.clearable == false ? false : true" :filterable="item.filterable" :parentFileds="item.parentFileds || ''"
              :returnCodeField="item.returnCodeField" :returnTextField="item.returnTextField" :validrule="item.validrule" :queryParams="item.queryParams"
              :disabled="item.disabled" :dataToObject="item.dataToObject" :labelWidth="item.labelWidth" :labelMaxCount="item.labelMaxCount" :popper-class="item.popperClass"></component>
              </el-form-item>
            </el-col>
            <el-col v-else :span="item.span || 6" :style="item.class" :key="`fieldsMore_${index}`" class="heightFix"></el-col>
          </template>
        </el-col>
      </el-row>
    </el-form>
  </section>
</template>
<script>
import mixButton from "@/components/basicComponent/mixButton"
import mixDateRangePicker from "@/components/basicComponent/mixDateRangePicker"
import { DatePicker } from 'ant-design-vue';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import Vue from 'vue'
export default {
  components: {
    mixButton,
    mixDateRangePicker
  },
  props: {
    // 创建表单的参数
    dynamicFormFields: { type: Array, default: () => [] },
    // 创建表单的参数
    dynamicFieldsData: { type: Object, default: () => { } },
    // 是否是查询条件
    isSearch: { type: Boolean, default: false },
    //查询参数配置
    queryParams: { type: Object, default: () => { } },
    //显隐第一行个数(动态改变)
    showNum: {type: Number, default: 4},
    //是否显示表单
    isShow:{type: Boolean, default: true}
  },
  data() {
    return {
      //表单值
      fieldsData: this.dynamicFieldsData,
      // 表单列
      fields: this.dynamicFormFields,
      // 更多列
      fieldsMore: [],
      //更多图标
      moreBtnIcon: "el-icon-plus",
      //隐藏更多
      toggleParam: false,
      //重置的默认数据
      resetData: JSON.parse(JSON.stringify(this.dynamicFieldsData)),
      locale
    };
  },
  created() {
    this.copyFormFields(this.dynamicFormFields);
  },
  methods: {
    queryList() {
      const that = this;
      that.listLoading = true;
      const queryObj = {
        // 请求类型&参数 保存mutation  查询query
        type: "query",
        typeParam:
          "($pageIndex: Int, $pageSize: Int, $dataInfo: " +
          that.queryParams.InputType +
          ")",
        // 请求API
        apiUrl: that.queryParams.APIUrl,
        // 需要调用的API服务配置
        apiServices: [
          {
            // API服务编码&参数
            apiServiceCode: that.queryParams.ServiceCode,
            apiServiceParam:
              "(dataInfo: $dataInfo, pageIndex: $pageIndex, pageSize: $pageSize)",
            // 表格中台返回网格的字段
            apiQueryRow: that.queryParams.apiQueryRow
          }
        ],
        // 条件/实体参数（变量），根据typeParam中的定义配置
        variables: {
          pageSize: that.pageSize,
          pageIndex: that.pageIndex,
          // 当前中台使用的名称有dataInfo、info，具体查看API文档
          dataInfo: that.queryParams.dataInfo
        }
      };
      var paramD = that.$getParams(queryObj);
      that.$requestAPI(paramD).then(response => {
        if (response.result === "1") {
          that.fieldsData = response.rows;
        } else {
          that.$message({
            message: "查询失败：" + response.msg,
            type: "warn",
            uration: 2000
          });
        }
        that.listLoading = false;
      });
    },
    // 复制表单参数，fieldsData缺值赋空
    copyFormFields() {
      const that = this;
      let fields = this.fields;
      let arr = fields.filter(o => o.hidden !== true);
      if (this.isSearch) {
        let s = arr.slice(0, this.showNum);
        let e = arr.slice(this.showNum);
        //fields
        s.map(function (item, i) {
          //设置表单数据为空
          !that.fieldsData[item.codeField]
            ? that.$set(that.fieldsData, item.codeField, "")
            : false;
          //无事件设置
          !item.event ? (item.event = () => 0) : false;
          //下拉框数据为空
          item.type === "dropdownList" && !item.options ? [] : false;
          !item.rules ? (item.rules = null) : false;
          Vue.set(item, 'showLabel', false)
        });
        //fieldsMore
        e.map(function (item, i) {
          //设置表单数据为空
          !that.fieldsData[item.codeField]
            ? that.$set(that.fieldsData, item.codeField, "")
            : false;
          //无事件设置
          !item.event ? (item.event = () => 0) : false;
          //下拉框数据为空
          item.type === "dropdownList" && !item.options ? [] : false;
          !item.rules ? (item.rules = null) : false;
          Vue.set(item, 'showLabel', false)
        });
        this.fields = s;
        this.fieldsMore = e;
        // this.$set(this.fieldsMore, e)
      } else {
        arr.map(function (item, i) {
          //设置表单数据为空
          !that.fieldsData[item.codeField]
            ? that.$set(that.fieldsData, item.codeField, "")
            : false;
          //无事件设置
          !item.event ? (item.event = () => 0) : false;
          //下拉框数据为空
          item.type === "dropdownList" && !item.options ? [] : false;
          !item.rules ? (item.rules = null) : false;
          Vue.set(item, 'showLabel', false)
        });
        this.fields = arr;
      }
    },
    //复制表单数据
    copyfieldsData() {
      const that = this;
      // Object.keys(that.dynamicFieldsData).forEach(function(key){
      //   let val = that.dynamicFieldsData[key] || ''
      //   that.$set(that.fieldsData, key, val)
      // })
      let fieldsData = Object.assign({}, this.dynamicFieldsData);
      return fieldsData;
    },
    //手动设置某个属性值
    reloadFormFields(codeField, attr, data) {
      this.fields.map((item, i) => {
        if (item.codeField === codeField) {
          item[attr] = data;
          return false;
        }
      });
      this.fieldsMore.map((item, i) => {
        if (item.codeField === codeField) {
          item[attr] = data;
          return false;
        }
      });
    },
    //更多收缩方法
    changeToggleParam() {
      this.toggleParam = !this.toggleParam;
      if (this.toggleParam) {
        this.moreBtnIcon = "el-icon-minus";
      } else {
        this.moreBtnIcon = "el-icon-plus";
      }
    },
    //重置表单数据
    resetFormdata() {
      const that = this
      for (let i in this.fieldsData) {
        if(this.fieldsData[i] instanceof Array){
          this.fieldsData[i].splice(0)
          this.resetData[i].forEach(item => {
            that.fieldsData[i].push(item)
          })
        }
      }
      this.$refs.ruleForm.resetFields()
    },
    doChildEvent(clickEvent, args) {
      args = args || {};
      if (typeof clickEvent === "function") {
        clickEvent({ ...args });
      } else {
        if(clickEvent){
          let t = this.$parent
          while(!t[clickEvent]){
            t = t.$parent
          }
          t[clickEvent]({ ...args })
        }
      }
    },
    showLabel(item){
      //判断超过4个字的显示溢出效果
      if (item.label.length > 6) {
        item.showLabel = true
      }
    },
    hideLabel(item){
      item.showLabel = false
    }
  }
};
</script>
<style lang="scss" scoped>
  .btnSuffix /deep/.el-input__suffix{
    height: 93%;
    margin: 1px 1px 1px 0;
    border-left: 1px solid #DCDFE6;
    right: 0;
    background-color: #f5f7fa;
  }
  .btnSuffix .el-input__suffix{
    height: 93%;
    margin: 1px 1px 1px 0;
    border-left: 1px solid #DCDFE6;
    right: 0;
    background-color: #f5f7fa;
  }
  .el-icon-search{
    padding: 7px 10px;
    cursor: pointer;
  }
  .mix-icon{
    padding: 6px 10px;
    cursor: pointer;
  }
  .el-input-autocomplete{
    display: block;
  }
  .heightFix{
    height: 30px;
  }
  .el-form-item /deep/label + .el-form-item__content{
    margin-left: 90px;
  }
  .mixRuleForm .el-col .el-input, .mixRuleForm .el-col .el-select, .mixRuleForm .el-col .el-textarea, .mixRuleForm .el-date-editor--daterange.el-input, .mixRuleForm .el-date-editor--daterange.el-input__inner, .mixRuleForm .el-date-editor--timerange.el-input, .mixRuleForm .el-date-editor--timerange.el-input__inner{
    width: calc(100% - 5px);
  }
  .el-input-autocomplete /deep/.el-input{
    width: calc(100% - 5px);
  }
  .u-checkbox /deep/.el-form-item__content{
    margin-left: 0;
  }
  .font-Weight-red /deep/ .el-input__inner{
    font-weight: bold;
    color: red;
    font-family: '微软雅黑';
  }
</style>
